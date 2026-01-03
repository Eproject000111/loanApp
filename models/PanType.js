module.exports = (sequelize, DataTypes)=>{
    const PanTypes = sequelize.define('pan_types',{
        fourth_letter: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: true
    }
    )

    PanTypes.afterSync(async () => {
        const count = await PanTypes.count();

        if (count === 0) {
            await PanTypes.bulkCreate([
                {
                    fourth_letter: "P",
                    description: "Individual"
                },
                {
                    fourth_letter: "C",
                    description: "Company"
                },
                {
                    fourth_letter: "H",
                    description: "Hindu undivided family"
                },
                {
                    fourth_letter: "A",
                    description: "Association of person"
                },
                {
                    fourth_letter: "B",
                    description: "Body of individual"
                },
                {
                    fourth_letter: "G",
                    description: "Government Agency"
                },
                {
                    fourth_letter: "J",
                    description: "Artificial jurdicial person"
                },
                {
                    fourth_letter: "L",
                    description: "Local authority"
                },
                {
                    fourth_letter: "F",
                    description: "Firm or LLP"
                },
                {
                    fourth_letter: "T",
                    description: "Trust"
                },
                {
                    fourth_letter: "K",
                    description: "Krish"
                }
            ]);
        }
    });
    
    return PanTypes;    
}


/* 
    pan fourth letter and its description
    
    P -> Individual
    C -> Company
    H -> Hindu undivided family
    A -> Association of person
    B -> Body of individual
    G -> Government Agency
    J -> Artificial jurdicial person
    L -> Local authority
    F -> Firm or LLP
    T -> Trust
    K -> Krish
*/
 