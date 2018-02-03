export interface ItemType {
  id: number;
  name: string;
  description?: string;
  mass?: number;
  volume?: number;
  capacity?: number;
  published?: boolean;
  portionSize?: number;
}

export interface SkillLevel extends ItemType {
  level: number;
}

export interface ItemStack {
  type: ItemType;
  quantity: number;
}

export interface PossibleItemStack extends ItemStack {
  probability?: number;
}

export interface IndustrialActivity {
  materials?: ItemStack[];
  products?: PossibleItemStack[];
  skills?: SkillLevel[]
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
