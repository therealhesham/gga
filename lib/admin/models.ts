import "server-only";
import { prisma } from "@/lib/prisma";
import type { CollectionKey } from "./config";

type Row = Record<string, unknown> & { id: number };

/** واجهة مشتركة بين جداول Prisma المستخدمة في المحوّل العام للـ CRUD */
export type Delegate = {
  findMany(args?: object): Promise<Row[]>;
  findUnique(args: object): Promise<Row | null>;
  create(args: object): Promise<Row>;
  update(args: object): Promise<Row>;
  delete(args: object): Promise<Row>;
};

const as = (d: unknown) => d as Delegate;

export const DELEGATES: Record<CollectionKey, Delegate> = {
  stats: as(prisma.stat),
  pillars: as(prisma.pillar),
  services: as(prisma.service),
  categories: as(prisma.projectCategory),
  projects: as(prisma.project),
  "quality-items": as(prisma.qualityItem),
  metrics: as(prisma.qualityMetric),
  certifications: as(prisma.certification),
  partners: as(prisma.partner),
  testimonials: as(prisma.testimonial),
};

export const ORDER_BY: { sortOrder?: "asc"; id?: "asc" }[] = [{ sortOrder: "asc" }, { id: "asc" }];
