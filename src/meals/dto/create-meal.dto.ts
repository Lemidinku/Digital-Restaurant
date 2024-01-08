import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Length,
    IsArray,
    IsIn,
    IsBoolean,
  } from 'class-validator';
  
  // type Allergies = 'Gluten' | ' Lactose' | 'Nuts' | 'Shellfish' | 'None';
  
  export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber(
      { allowInfinity: false, allowNaN: false },
      { message: 'Value must be a number.' },
    )
    price: number;
  
    @IsNotEmpty()
    @IsString()
    @Length(10, 200, {
      message: 'Description must be between 10 and 200 characters long.',
    })
    description: string;
  
    @IsNotEmpty()
    @IsString()
    imageUrl: string;
  
    // taking: can we just use the isin option only
  
    @IsNotEmpty()
    @IsArray({ message: 'Value must be an array.' })
    @IsIn(['Breakfast', 'Lunch', 'Dinner', 'Starter', 'Desert'], {
      each: true,
      message: 'Invalid Meals types.',
    })
    types: string[];
  
    @IsNotEmpty()
    @IsBoolean()
    fasting: boolean;
  
    // taking: can we just use the isin option only
  
    @IsNotEmpty()
    @IsArray({ message: 'Value must be an array.' })
    @IsIn(['Gluten', 'Lactose', 'Nuts', 'Shellfish', 'None'], {
      each: true,
      message: 'Invalid allergy type.',
    })
    allergies: string[];
  
    constructor(data: Partial<CreateMealDto>) {
      Object.assign(this, data);
  
      // Set a default value for allergies if not provided
      if (!this.allergies || this.allergies.length === 0) {
        this.allergies = ['None'];
      }
    }
  
    @IsNotEmpty()
    @IsString()
    origin: string;
  }
  