import Joi from "joi";

const taskSchema = Joi.object({
  status: Joi.boolean().required(),
  title: Joi.string().required(),
});

export default taskSchema;
