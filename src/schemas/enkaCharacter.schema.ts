import { object, string, TypeOf } from "zod";

const params = {
  params: object({
    enkaId: string({ required_error: "Character Enka Id is required" }),
  }),
};

const getCharacterByIdSchema = object({
  ...params,
});

type GetCharacterEnkaIdInput = TypeOf<typeof getCharacterByIdSchema>;

export { GetCharacterEnkaIdInput };
