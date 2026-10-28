# syntax=docker/dockerfile:1

# بناء الصورة (الصفحة الرئيسية بتقرأ من MySQL وقت البناء، فبنمرّر .env كـ secret):
#   docker build --secret id=env,src=.env -t gga .
#
# تشغيل الصورة (ملاحظة: --env-file في docker run لا يشيل علامات التنصيص "،
# فاستخدم ملفًا بدون تنصيص مثل .env.docker يحتوي DATABASE_URL=mysql://... و SESSION_SECRET=...):
#   docker run -d --name gga -p 3000:3000 --env-file .env.docker -v gga_uploads:/app/uploads gga

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------- تثبيت الحزم ----------
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# postinstall = prisma generate: يحتاج DATABASE_URL موجودًا فقط (مش لازم يتصل بالقاعدة)
RUN DATABASE_URL="mysql://build:build@localhost:3306/build" npm ci

# ---------- البناء ----------
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
ENV NEXT_TELEMETRY_DISABLED=1
# public فاضي وGit لا يتتبّع المجلدات الفاضية
RUN mkdir -p public
# الـ .env يُركّب مؤقتًا أثناء البناء ولا يُحفظ داخل طبقات الصورة
RUN --mount=type=secret,id=env,target=/app/.env npm run build

# ---------- التشغيل ----------
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# الصور المرفوعة من لوحة التحكم (اربطها بـ volume علشان ما تضيعش عند إعادة التشغيل)
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads
VOLUME ["/app/uploads"]

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/admin/login || exit 1

CMD ["node", "server.js"]
