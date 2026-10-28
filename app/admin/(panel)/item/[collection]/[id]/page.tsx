import { notFound } from "next/navigation";
import { COLLECTIONS, isCollectionKey, sectionOfCollection } from "@/lib/admin/config";
import { DELEGATES, ORDER_BY } from "@/lib/admin/models";
import { parseFeatures } from "@/lib/admin/parse";
import { prisma } from "@/lib/prisma";
import { saveItem } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { Card, PageHeader } from "@/components/admin/Ui";

export default async function ItemPage({ params }: PageProps<"/admin/item/[collection]/[id]">) {
  const { collection, id: rawId } = await params;
  if (!isCollectionKey(collection)) notFound();

  const def = COLLECTIONS[collection];
  const isNew = rawId === "new";
  const id = isNew ? 0 : Number(rawId);
  if (!isNew && !Number.isInteger(id)) notFound();

  const delegate = DELEGATES[collection];
  let initial: Record<string, unknown>;

  if (isNew) {
    const last = (await delegate.findMany({ orderBy: ORDER_BY })).at(-1);
    initial = {
      sortOrder: Number(last?.sortOrder ?? 0) + 1,
      published: true,
      rating: 5,
      percent: 100,
      features: [],
    };
  } else {
    const row = await delegate.findUnique({ where: { id } });
    if (!row) notFound();
    initial = { ...row, features: parseFeatures(JSON.stringify(row.features ?? [])) };
  }

  const categories =
    collection === "projects"
      ? await prisma.projectCategory.findMany({ orderBy: ORDER_BY, select: { id: true, name: true } })
      : [];

  const backHref = `/admin/section/${sectionOfCollection(collection)?.key ?? ""}`;

  return (
    <>
      <PageHeader
        title={isNew ? `إضافة ${def.singular}` : `تعديل ${def.singular}`}
        description={def.title}
        backHref={backHref}
      />
      <Card>
        <AdminForm
          fields={def.fields}
          initial={initial as never}
          action={saveItem.bind(null, collection, id)}
          categoryOptions={categories}
          submitLabel={isNew ? `إضافة ${def.singular}` : "حفظ التغييرات"}
          cancelHref={backHref}
        />
      </Card>
    </>
  );
}
