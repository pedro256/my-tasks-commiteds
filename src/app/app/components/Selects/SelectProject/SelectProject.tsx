import ProjectItem from "@/app/api/dto/ProjectItem";
import Select from "@/components/select/Select";

export default async function SelectProject() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/projects`
  );

  const projects: Array<ProjectItem> = await req.json();
  const options = projects.map((p) => {
    return {
      value: p.id,
      label: p.name,
    };
  });

  return <Select options={options} />;
}
