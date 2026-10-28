import { notFound } from "next/navigation";
import { SECTION_BY_KEY, SETTINGS_GROUPS } from "@/lib/admin/config";
import { getSettings } from "@/lib/data";
import { saveSettings } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { CollectionList } from "@/components/admin/CollectionList";
import { Card, PageHeader } from "@/components/admin/Ui";

export default async function SectionPage({ params }: PageProps<"/admin/section/[key]">) {
  const { key } = await params;
  const section = SECTION_BY_KEY[key];
  if (!section) notFound();

  const group = section.settings ? SETTINGS_GROUPS[section.settings] : null;
  const settings = group ? await getSettings() : null;

  return (
    <>
      <PageHeader title={section.title} description={section.description} />

      {group && settings && (
        <Card title={group.title}>
          <AdminForm
            fields={group.fields}
            initial={settings}
            action={saveSettings.bind(null, section.settings!)}
          />
        </Card>
      )}

      {section.collections.map((c) => (
        <CollectionList key={c} collection={c} />
      ))}
    </>
  );
}
