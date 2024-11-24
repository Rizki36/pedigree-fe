import useAnimalListQuery from "@/common/queries/useAnimalListQuery";
import { Route } from "@/routes/animals/$animalId/index";

const useAnimal = () => {
  const { animalId } = Route.useParams();

  const queryResult = useAnimalListQuery({
    query: {
      id_eq: animalId,
    },
    options: {
      enabled: !!animalId,
    },
  });

  const animal = queryResult.data?.docs?.[0];

  return { ...queryResult, animal };
};

export default useAnimal;
