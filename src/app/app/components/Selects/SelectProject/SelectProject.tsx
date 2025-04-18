"use client";
import Select from "@/components/select/Select";

export default function SelectProject() {
  // const req = await fetch(
  //   `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/projects`
  // );

  // const projects: Array<ProjectItem> = await req.json();
  // const options = projects.map((p) => {
  //   return {
  //     value: p.id,
  //     label: p.name,
  //   };
  // });

  return (
    <Select
      onSelect={(opt) => console.log("option", opt)}
      options={[
        {
          label: "Primeira",
          value: "PR",
        },
        {
          label: "Ice Cream",
          value: "IC",
        },
        {
          label: "Popcorn",
          value: "PP",
        },
        {
          label: "In Brasil",
          value: "BR",
        },
      ]}
      label="Select Options"
    />
  );
}
