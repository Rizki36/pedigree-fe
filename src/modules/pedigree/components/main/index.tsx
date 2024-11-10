import MainLayout from "@/common/layouts/MainLayout";
import Tree, { type MyNode } from "./Tree";
import nodes from "./tree.json";
import { Button } from "@/common/components/ui/button";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MdOutlineZoomInMap } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Route } from "@/routes/pedigree";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";

const animals: {
  id: string;
  name: string;
  code: string;
}[] = [
  {
    id: "a5gr84s9",
    name: "John",
    code: "AAA-001",
  },
  {
    id: "m5gr84i2",
    name: "Jane",
    code: "AAA-002",
  },
  {
    id: "a5gr84s1",
    name: "Mary",
    code: "AAA-003",
  },
];

const Pedigree = () => {
  const { animalId } = Route.useSearch();
  const currentAnimal = animals.find((animal) => animal.id === animalId);
  const navigate = useNavigate({ from: Route.fullPath });

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const onDownloadImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true, quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Pedigree Tree of ${currentAnimal?.name ?? "Animal"}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, currentAnimal?.name]);

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="mt-4 text-3xl">Pedigree Tree</h1>
        </div>
        <div className="flex flex-col h-[75vh] overflow-hidden border rounded-2xl px-4 bg-neutral-50 relative">
          <div className="text-sm border-b w-[calc(100%+32px)] ml-[-16px] px-4 flex items-center py-3">
            <span className="mr-2">Current Animal</span>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {animalId
                    ? animals.find((animal) => animal.id === animalId)?.name
                    : "Select animal..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search animal..." />
                  <CommandList>
                    <CommandEmpty>No animal found.</CommandEmpty>
                    <CommandGroup>
                      {animals.map((animal) => (
                        <CommandItem
                          key={animal.id}
                          value={animal.id}
                          onSelect={(currentValue) => {
                            navigate({
                              search: (prev) => {
                                return {
                                  ...prev,
                                  animalId:
                                    currentValue === animalId
                                      ? ""
                                      : currentValue,
                                };
                              },
                            });
                            setOpen(false);
                          }}
                          className="justify-between"
                        >
                          {animal.name}
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              animalId === animal.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="h-full relative">
            <div className="absolute flex items-center text-xs top-2 -right-1 bg-white px-3 py-2 rounded-xl shadow-lg z-50">
              <MdOutlineZoomInMap className="mr-2" />
              Drag and pinch to zoom
            </div>
            <div ref={ref} className="h-full">
              <Tree nodes={nodes as MyNode[]} />
            </div>
          </div>

          <div className="border-t w-[calc(100%+32px)] ml-[-16px] px-4 flex items-center justify-between text-xs py-3">
            <div className="text-neutral-400">Pedigree</div>
            <div>
              <div className="">
                <div className="flex items-center gap-2 border px-3 py-2 bg-white rounded-2xl">
                  <div className="flex items-center">
                    Female
                    <IoMdFemale className="text-yellow-600 text-lg ml-1" />
                  </div>
                  <div className="flex items-center">
                    Male <IoMdMale className="text-green-600 text-lg ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-xl"
            variant="teal"
            onClick={onDownloadImage}
          >
            Download Image
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pedigree;
