import { object, string, TypeOf } from "zod";

const queryPayload = {
  query: object({
    enkaId: string({ required_error: "Character Enka Id is required" }),
    enkaSkillDepotId: string({ required_error: "Skill Depot Id is required" }),
  }),
};

const getCharacterByIdSchema = object({
  ...queryPayload,
});

type GetCharacterEnkaIdInput = TypeOf<typeof getCharacterByIdSchema>;

export { GetCharacterEnkaIdInput, getCharacterByIdSchema };
