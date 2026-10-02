export type Member = {
  name: string;
  id: string;
  area: string;
  ministry: string;
  status: "Active" | "For follow-up" | "New member";
  initials: string;
  color: string;
};

export const initialMembers: Member[] = [
  { name: "Marites D. Santos", id: "ME-2024-0081", area: "Quezon City", ministry: "ComDev Pastor", status: "Active", initials: "MS", color: "peach" },
  { name: "Joel R. Manalo", id: "ME-2024-0079", area: "Marikina", ministry: "SGL", status: "Active", initials: "JM", color: "blue" },
  { name: "Liza P. Villanueva", id: "ME-2024-0077", area: "Antipolo", ministry: "SGM", status: "For follow-up", initials: "LV", color: "purple" },
  { name: "Ramon C. de la Cruz", id: "ME-2024-0076", area: "Pasig", ministry: "ComDev Pastor", status: "Active", initials: "RC", color: "green" },
  { name: "Esther M. Reyes", id: "ME-2024-0074", area: "Mandaluyong", ministry: "SGL", status: "New member", initials: "ER", color: "gold" },
];
