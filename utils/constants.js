export const category=[
    "Electronics",
    "Beer,Wine & Sprits",
    "Drinks",
    "Paper & Tissue",
    "Household",
    "Dairy, Chilled & Eggs",
    "Fruits",
    "Vegetables",
    "Rice, Noodles & Cooking Ingredients"
]


export const dateFormater=(date)=>{
    return new Date(date).toLocaleDateString("en-SG",{
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
    })
}