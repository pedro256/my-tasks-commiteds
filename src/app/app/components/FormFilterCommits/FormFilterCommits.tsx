"use client";
import ProjectItem from "@/app/api/dto/ProjectItem";
import Select, { ISelectOption } from "@/components/select/Select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type TModel = {
  projects: ISelectOption;
};

interface ProjectFilter {
  name: string;
  id: string;
  branch?: string;
}
export default function FormFilterCommits() {
  const {  handleSubmit } = useForm<TModel>();
  const [optsProjects, setOptsProjects] = useState<Array<ISelectOption>>();

  /**
   * @description Selecteds Projects
   */
  const [slcPrjs, setSlcPrjs] = useState<ProjectFilter[]>([]);

  async function buscarProjetos(): Promise<ISelectOption[]> {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/projects`
    );
    const projects: Array<ProjectItem> = await req.json();
    const list: Array<ISelectOption> = [];
    projects.forEach((prj) => {
      list.push({
        label: prj.name,
        value: prj.id.toString(),
      });
    });

    return list;
  }
  function buscarDadosIniciais() {
    buscarProjetos().then((options) => {
      setOptsProjects(options);
    });
  }

  useEffect(() => {
    buscarDadosIniciais();
  }, []);

  function onSubmit(data: TModel) {
    console.log("formulario", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <Select
          label="Projetos"
            options={optsProjects}
            onSelect={(vl: any) => {
              setSlcPrjs([
                ...slcPrjs,
                {
                  name: vl.label,
                  id: vl.value,
                },
              ]);
            }}
          />
        </div>
        <div className="col-span-1">
            <div className="flex flex-wrap gap-2">
            {slcPrjs.map((prj) => (
            <div key={prj.name} className="p-2 border-le rounded h-auto">
              <p> {prj.name}</p>
              <span>{prj.branch}</span>
            </div>
          ))}
            </div>
          
        </div>
      </div>
      <button className="" type="submit">BUSCAR</button>
    </form>
  );
}
