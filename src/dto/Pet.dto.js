export default class PetDTO {
    constructor(pets) {
        this.name = pets.name;
        this.specie = pets.specie;
        this.image = pets.image;
        this.birthDate = pets.birthDate;
        this.adopted = pets.adopted;
      
    }

    static getPetInputFrom = (pet) =>{
        return {
            name:pet.name||'',
            specie:pet.specie||'',
            image: pet.image||'',
            birthDate:pet.birthDate||'12-30-2000',
            adopted:false
        }
    }
}