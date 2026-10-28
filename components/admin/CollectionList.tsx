import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { COLLECTIONS, type CollectionKey } from "@/lib/admin/config";
import { DELEGATES, ORDER_BY } from "@/lib/admin/models";
import { deleteItem } from "@/app/admin/actions";
import { Icon } from "@/lib/icons";
import { Card } from "./Ui";
import { DeleteButton } from "./DeleteButton";

export async function CollectionList({ collection }: { collection: CollectionKey }) {
  const def = COLLECTIONS[collection];
  const rows = await DELEGATES[collection].findMany({ orderBy: ORDER_BY });

  return (
    <Card
      title={`${def.title} (${rows.length})`}
      action={
        <Link
          href={`/admin/item/${collection}/new`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary text-sm font-bold hover:bg-primary-container transition-colors"
        >
          <Plus className="size-4" />
          إضافة {def.singular}
        </Link>
      }
    >
      {rows.length === 0 ? (
        <p className="text-center text-on-surface-variant py-6">لا توجد عناصر بعد.</p>
      ) : (
        <ul className="divide-y divide-outline-variant/60 -my-3">
          {rows.map((row) => (
            <li key={row.id} className="py-3 flex items-center gap-4">
              {def.iconField && (
                <span className="size-10 shrink-0 flex items-center justify-center bg-surface-container border border-outline-variant text-primary">
                  <Icon name={String(row[def.iconField] ?? "")} className="size-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-on-surface truncate">
                  {String(row[def.primary] ?? "")}
                  {row.published === false && (
                    <span className="ms-2 text-[11px] bg-surface-container-high text-on-surface-variant px-2 py-0.5">
                      مخفي
                    </span>
                  )}
                </p>
                {def.secondary && (
                  <p className="text-sm text-on-surface-variant truncate">
                    {String(row[def.secondary] ?? "")}
                  </p>
                )}
              </div>
              <span className="hidden sm:block text-xs text-outline shrink-0" dir="ltr">
                #{String(row.sortOrder ?? "")}
              </span>
              <Link
                href={`/admin/item/${collection}/${row.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
              >
                <Pencil className="size-4" />
                تعديل
              </Link>
              <DeleteButton
                action={deleteItem.bind(null, collection, row.id)}
                confirmText={`حذف "${String(row[def.primary] ?? "")}" نهائيًا؟`}
              />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
