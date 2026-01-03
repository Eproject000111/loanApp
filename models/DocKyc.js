module.exports = (sequelize, DataTypes)=>{
    const DocsKyc = sequelize.define('docs_kyc',{
        icon_class: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        doc_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doc_name_mandatory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doc_number_mandatory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        review_after: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        kyc_action: {
            type: DataTypes.ENUM('null',"UPLOAD", "VIDEO", "SELFIE", "BANKCHECK", "AADHAAR-AUTH"),
            allowNull: false,
            defaultValue: 'UPLOAD'
        },
        action_config1: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        doc_desc: {
            type: DataTypes.TEXT, 
            allowNull: true, 
            defaultValue: null
        },
        approval_instruction: {
            type: DataTypes.TEXT, 
            allowNull: true, 
            defaultValue: null
        },
        doc_upload: {
            type: DataTypes.ENUM("O", "M"), 
            allowNull: false, 
            defaultValue: 'O'
        },
        allow_roles: {
            type: DataTypes.STRING, 
            allowNull: true, 
            defaultValue: null
        },
        pan_cate: {
            type: DataTypes.STRING, 
            allowNull: true, 
            defaultValue: null
        },
        allow_user_types: {
            type: DataTypes.STRING, 
            allowNull: true, 
            defaultValue: null
        }
    },    
    {
        tableName: "docs_kyc",      // 👈 exact table name
        freezeTableName: true,      // 👈 prevents pluralization
        // timestamps: false
        paranoid: true
    })

    DocsKyc.afterSync(async () => {
        const count = await DocsKyc.count();

        if (count === 0) {
            await DocsKyc.bulkCreate([
                {
                    icon_class: "fa-id-card",
                    doc_name: "PAN Card",
                    doc_name_mandatory: "PAN",
                    doc_number_mandatory: 1,
                    review_after: "0",
                    kyc_action: "UPLOAD",
                    action_config1: "pdf,jpeg,jpg",
                    doc_desc: `<center><img width="150px" src="/static/images/pancard.png" /></center><br />
                        <strong>Please Note:</strong><br /><br />
                        <ul>
                        <li>Upload clear copy of Self Attested (stamped if firm / company) PAN</li>
                        <li>PAN once updated cannot be changed</li>
                        <li>Only JPG / JPEG / PNG / PDF formats are allowed</li>
                        </ul>
                    `,
                    approval_instruction: `<ul>
                        <li>PAN Card Self Attested</li>
                        <li>Document should be readable</li>
                        <li>Photo of Individual should be clear (if any)</li>
                        <li>PAN & Self Attested Signature must match</li>
                        <li>Date of Birth from PAN must be considered as final</li>
                        <li>No Editing should be observed</li>
                        </ul>
                    `,
                    is_active: 1,
                    doc_upload: "O",
                    allow_roles:'1,2,3',
                    pan_cate: "P,C,G,F,A,B,H,L,J,T,K"
                },
                {
                    icon_class: "fa-id-card",
                    doc_name: "E-AADHAAR",
                    doc_name_mandatory: "AADHAAR",
                    doc_number_mandatory: 1,
                    review_after: "0",
                    kyc_action: "UPLOAD",
                    action_config1: "pdf,jpeg,jpg",
                    doc_desc: `
                        <strong>Refer the below steps for Identity & Address Verification:</strong><br />
                        <ul>
                        <li>Mobile Number in Aadhaar & Portal must be same</li>
                        <li>Download <strong>MASKED E-Aadhaar</strong> from <a href="https://eaadhaar.uidai.gov.in" target="_blank">https://eaadhaar.uidai.gov.in<a/> (not older than 3 days)
                        <li>Take a print and self-attest the copy of E-Aadhaar</li>
                        <li>Scan and upload the self-attested copy here (only JPG / JPEG / PNG / PDF formats)</li>
                        <li>Photo must be clearly visible on the uploaded document</li>

                        </ul>
                        <br />

                        <center><small><small><i>I hereby give my consent and submit voluntarily at my own discretion, the copy of Aadhaar card for the purpose of establishing my identity / address on the portal. The Aadhaar submitted herewith shall not be used for any purpose other than mentioned by the Company, or as per the requirements of the law.</i></small></small></center>
                    `,
                    approval_instruction: `
                    <ul>
                        <li>Downloaded within 3 Days</li>
                        <li>RMN & Aadhaar Mobile must be same</li>
                        <li>Masked E-Aadhaar (full page) Self Attested</li>
                        <li>Document Address should be readable</li>
                        <li>Photo of Individual should be clear</li>
                        <li>No Editing should be observed</li>
                    </ul>
                    `,
                    is_active: 1,
                    doc_upload: "O",
                    allow_roles:'1,2,3',
                    pan_cate: "P,C,G,F,A,B,H,L,J,T,K"
                }
            ]);
        }
    });
    
    return DocsKyc;    
}