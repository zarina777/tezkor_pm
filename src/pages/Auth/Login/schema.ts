import { z } from "zod";
const schema = z.object({
  phone_number: z.string().min(8, "This is an error message."),
  password: z.string().min(8, "This is an error message."),
});

type FormSchemaType = z.infer<typeof schema>;
export { schema };

export type { FormSchemaType };
