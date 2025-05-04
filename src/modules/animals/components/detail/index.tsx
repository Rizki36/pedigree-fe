import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import MainLayout from "@/common/layouts/MainLayout";
import { Link } from "@tanstack/react-router";
import { Button } from "@/common/components/ui/button";
import { ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import AchievementTable from "./AchievementTable";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useState, type FC } from "react";
import dayjs from "dayjs";
import useAnimal from "../../hooks/useAnimal";
import DeleteAnimalDialog from "./DeleteAnimalDialog";
import DetailsSection from "./DetailsSection";
import ParentSection from "./ParentSection";
import NoteSection from "./NoteSection";
import AchievementDialog from "./AchievementDialog";
import type { AchievementDialogProps } from "./AchievementDialog";
import DeleteAchievementDialog from "./DeleteAchievementDialog";
import type { DeleteAchievementDialogProps } from "./DeleteAchievementDialog";

type MateType = {
  id: string;
  code: string;
  name: string;
  matedAt: string;
};

const mates: MateType[] = [
  {
    id: "m5gr84i9",
    name: "Jane",
    code: "AAA-003",
    matedAt: "2022-01-01",
  },
  {
    id: "a5gr84s9",
    name: "Mary",
    code: "AAA-004",
    matedAt: "2022-01-01",
  },
];

const AnimalDetail = () => {
  const [deleteAchievementState, setDeleteAchievementState] = useState<
    DeleteAchievementDialogProps["state"]
  >({
    open: false,
    id: null,
  });
  const [achievementDialogState, setAchievementDialogState] = useState<
    AchievementDialogProps["state"]
  >({
    mode: "add",
    data: null,
    open: false,
    id: null,
  });

  const { animal } = useAnimal();

  return (
    <MainLayout>
      <DeleteAchievementDialog
        state={deleteAchievementState}
        setState={setDeleteAchievementState}
      />
      <AchievementDialog
        state={achievementDialogState}
        setState={setAchievementDialogState}
      />

      <div className="-mt-4 w-[calc(100%+48px)] ml-[-24px] bg-teal-600 px-6 rounded-b-3xl py-4 pb-12">
        <div className="flex items-center justify-between text-white">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  <BreadcrumbLink asChild>
                    <Link to="/animals">Animals</Link>
                  </BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {animal?.code || "-"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-x-2">
            <DeleteAnimalDialog />

            <div className="border border-white/0 hover:border-white/100 rounded-lg opacity-50 hover:opacity-100">
              <Button variant="ghost" size="sm">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 translate-y-[-50px]">
        <div className="grid grid-cols-[1fr_350px] gap-x-4">
          <div className="space-y-3">
            {/* Animal Detail */}
            <DetailsSection animal={animal} />

            {/* Achievement section */}
            <section className="py-4 px-3 rounded-lg border border-neutral-200 bg-white">
              <div className="mb-3 flex justify-between items-center">
                Achievements
                <Button
                  onClick={() => {
                    setAchievementDialogState({
                      ...achievementDialogState,
                      open: true,
                      mode: "add",
                    });
                  }}
                  size="sm"
                  variant="ghost"
                >
                  <PlusIcon />
                </Button>
              </div>
              <div>
                <AchievementTable
                  deleteState={deleteAchievementState}
                  setDeleteState={setDeleteAchievementState}
                  updateState={achievementDialogState}
                  setUpdateState={setAchievementDialogState}
                />
              </div>
            </section>
          </div>
          <div className="space-y-3">
            {/* Parent section */}
            <ParentSection animal={animal} />

            {/* Mate section */}
            <section className="py-4 px-3 rounded-lg border border-neutral-200 bg-white">
              <div className="mb-3 flex items-center justify-between">
                Mate
                <Button variant="ghost" size="sm">
                  <PlusIcon />
                </Button>
              </div>

              <div className="space-y-2">
                {mates.map((mate) => (
                  <Mate key={mate.id} mate={mate} />
                ))}
              </div>
            </section>

            {/* Note section */}
            <NoteSection animal={animal} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const Mate: FC<{
  mate: MateType;
}> = ({ mate }) => {
  return (
    <div className="bg-slate-100 px-3 py-2 rounded">
      <div className="text-neutral-500 text-xs mb-1 flex items-center justify-between">
        Name
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Remove</DropdownMenuItem>
            <DropdownMenuItem>Update</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <div className="flex justify-between">
          <span>{mate.name}</span>
          <span>{mate.code}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs mt-1 text-neutral-400">
            Mated at: <span>{dayjs(mate.matedAt).format("DD MMMM YYYY")}</span>
          </div>
          <div className="text-xs mt-1 text-neutral-400">Children: 3</div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
