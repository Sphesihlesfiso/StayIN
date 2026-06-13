import prisma from "../config/db";

// Fetch all rules for a specific property
export const getAllRules = async (propertyId: number) => {
  return await prisma.rule.findMany({
    where: { propertyId },
  });
  
};

// Fetch a single rule by its own ID
export const getRuleById = async (id: number) => {
  return await prisma.rule.findUnique({
    where: { id },
  });
};

// Add a new rule to a property
export const addRule = async (propertyId: number, content: string) => {
  return await prisma.rule.create({
    data: {
      content,
      propertyId,
    },
  });
};

// Update an existing rule
export const updateRule = async (id: number, content: string) => {
  return await prisma.rule.update({
    where: { id },
    data: { content },
  });
};

// Delete a rule
export const deleteRule = async (id: number) => {
  return await prisma.rule.delete({
    where: { id },
  });
};
