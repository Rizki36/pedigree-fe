import type { FC } from "react";
import { Button } from "@/modules/common/components/ui/button";
import { Link } from "@tanstack/react-router";
import BreedingTable from "./Table";
import MainLayout from "@/modules/common/components/layouts/MainLayout";

const BreedingPage: FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Breeding Records
            </h1>
            <p className="text-muted-foreground">
              Manage breeding records and track breeding outcomes
            </p>
          </div>
          <Link to="/breeding/new">
            <Button>Add Breeding Record</Button>
          </Link>
        </div>

        <div className="space-y-4">
          <BreedingTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default BreedingPage;
