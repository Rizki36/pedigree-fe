import { Button } from "@/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import MainLayout from "@/common/layouts/MainLayout";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/pedigree";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tree, {
  type RawNodeDatum,
  type RenderCustomNodeElementFn,
} from "react-d3-tree";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart: RawNodeDatum = {
  name: "Helena",
  attributes: {
    code: "AAA-002",
  },
  children: [
    {
      name: "Holigan",
      attributes: {
        code: "AAA-003",
      },
      children: [
        {
          name: "Tuty",
          attributes: {
            code: "AAA-006",
          },
        },
        {
          name: "Harry",
          attributes: {
            code: "AAA-006",
          },
        },
      ],
    },
    {
      name: "Sally",
      attributes: {
        code: "AAA-004",
      },
      children: [
        {
          name: "John",
          attributes: {
            code: "AAA-005",
          },
        },
        {
          name: "Jane",
          attributes: {
            code: "AAA-005",
          },
        },
      ],
    },
  ],
};

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

const renderForeignObjectNode: RenderCustomNodeElementFn = ({
  nodeDatum,
  toggleNode,
}) => (
  <g>
    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
    <rect
      width="200"
      height="75"
      x="-100"
      onClick={toggleNode}
      radius={12}
      fill="#ffffff"
    />
    <text
      x="-85"
      y="18"
      text-anchor="start"
      dominant-baseline="hanging"
      color="#737373"
      fill="#737373"
      font-size="14px"
    >
      {nodeDatum.name}
    </text>
    <text
      x="-85"
      y="45"
      text-anchor="start"
      dominant-baseline="hanging"
      color="#737373"
      fill="#737373"
      font-size="12px"
    >
      {nodeDatum.attributes?.code}
    </text>
  </g>
);

const Pedigree = () => {
  const { animalId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [open, setOpen] = useState(false);

  const [translateX, setTranslateX] = useState(200);
  const [translateY, setTranslateY] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodeSize = { x: 200, y: 100 };

  const resetTranslate = () => {
    if (!containerRef.current) return;

    const containerDimensions = containerRef.current.getBoundingClientRect();

    setTranslateX(containerDimensions.width / 2);
    setTranslateY(10);
  };

  useEffect(() => {
    resetTranslate();
  }, [containerRef.current]);

  return (
    <MainLayout>
      <div className="mb-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
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
                                currentValue === animalId ? "" : currentValue,
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
                          animalId === animal.id ? "opacity-100" : "opacity-0",
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
      <div
        id="treeWrapper"
        ref={containerRef}
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
        className="border rounded-lg relative"
      >
        {/* <div className="absolute top-3 right-3 flex items-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => resetTranslate()}
          >
            Reset
          </Button>
          <Button variant="secondary" size="sm">
            <ZoomInIcon />
          </Button>
          <Button variant="secondary" size="sm">
            <ZoomOutIcon />
          </Button>
        </div> */}
        <Tree
          hasInteractiveNodes
          data={orgChart}
          orientation="vertical"
          translate={{ x: translateX, y: translateY }}
          centeringTransitionDuration={800}
          draggable
          zoomable
          nodeSize={nodeSize}
          zoom={1}
          scaleExtent={{
            min: 0.1,
            max: 1,
          }}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps })
          }
          pathFunc="step"
          separation={{
            siblings: 2,
            nonSiblings: 2,
          }}
          branchNodeClassName="!stroke-1"
          rootNodeClassName="!stroke-1"
        />
      </div>
      <div className="mt-3 flex justify-end">
        <Button onClick={() => {}}>Download</Button>
      </div>
    </MainLayout>
  );
};

export default Pedigree;
