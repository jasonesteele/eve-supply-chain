export interface ItemType {
  id: number;
  name: string;
}

export interface SkillRequirement extends ItemType {
  level: number;
}

export interface ItemStack {
  type: ItemType;
  quantity: number;
  probability?: number;
}

export interface PossibleItemStack extends ItemStack {
  probability?: number;
}

export interface IndustrialActivity {
  materials?: ItemStack[];
  products?: PossibleItemStack[];
  skills?: SkillRequirement[]
  time: number;
}

export interface BlueprintActivities {
  copying?: IndustrialActivity;
  researchMaterial?: IndustrialActivity;
  researchTime?: IndustrialActivity;
  manufacturing?: IndustrialActivity;
  invention?: IndustrialActivity;
}

export interface Blueprint extends ItemType {
  activities: BlueprintActivities;
  maxProductLimit?: number;
}
