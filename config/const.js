exports.mail = {
    WelcomeMail:{
        subject:"Code-Brew Welcome Mail"
    },
   
}

const SERVER={
    CYPTO:{
        HASH_METHOD:{
            ALGO: "sha256",
            PWD: "hash_secret"
        },
        ENCRYPT_DECRYPT_METHOD:{
            ALGO:"aes-256-cbc",
            PWD:"d6F%feq$33!23123",
        }
    },
    HTTP: {
        OK: 200,
        FORBIDDEN: 403,
        BAD_REQUEST: 400,
        UNPROCESSABLE_ENTITY: 422,
        SERVER_ERROR: 500,
        UNAUTHORIZED: 401
    },
    RESPONSE: {
        SUCCESS: "success",
        ERROR: "error",
    }

}

const BYPASSROUTES = [
    "/app/auth/signup",
    "/app/auth/login",
    "/app/auth/verifyOtp"
]

const DEBUG_USERS = {
    DEBUG: true,
    LIST: []
}


const ROUTE_PATH = {

    DASHBOARD:{
        LIST:{
            ADMIN_DASHBOARD : "/admin/dashboard"
        },
        CREATE:{},
        UPDATE:{},
        DELETE:{}
    },

    CATALOGUE:{
        LIST:{
            CATEGORY_LIST : "/category_list",
            SUB_CATEGORY_LIST : "/list_subcategories",
            LIST_PRODUCTS : "/list_products",
            LIST_DETAILED_SUB_CATEGORIES : "/list_detailed_sub_categories",
            ADMIN_GET_CATEGORIES_LIST : "/admin/get_categories_list",
            LIST_SUPPLIER_PRODUCTS : "/list_supplier_products",
            LIST_SUPPLIER_CATEGORIES : "/list_supplier_categories",
            SUB_CATEGORY_DATA : "/sub_category_data",
            PRODUCT_VARIANT_LIST : "/product_variant_list",
            LIST_SUPPLIER_BRANCH_PRODUCTS : "/v1/list_supplier_branch_products"
        },
        CREATE:{
            ADD_CATEGORY : "/add_category",
            ADD_SUB_CATEGORY : "/add_sub_category",
            ADD_PRODUCT : "/add_product",
            ADD_SUPPLIER_PRODUCT : "/add_supplier_product",
            ADD_PRODUCT_PRICING_BY_ADMIN : "/add_product_pricing_by_admin",
            ADD_CATEGORY_OF_SUPPLIER : "/add_category_of_supplier",
            ADD_SUPPLIER_BRANCH_PRODUCT : "/add_supplier_branch_product"
        },
        UPDATE:{
            EDIT_CATEGORY : "/edit_category",
            EDIT_SUB_CATEGORY : "/edit_sub_category",
            ASSIGN_PRODUCT_TO_SUPPLIER : "/assign_product_to_supplier",
            ASSIGN_PRODUCT_TO_SUPPLIER_BRANCH : "/assign_product_to_supplier_branch",
            EDIT_PRODUCT : "/edit_product" 

        },
        DELETE:{
            DELETE_PRODUCT : "/delete_product",
            DELETE_CATEGORY : "/delete_category",
            DELETE_SUPPLIER_PRODUCT : "/delete_supplier_product",
            DELETE_SUPPLIER_CATEGORY : "/delete_supplier_category",
            DELETE_SUPPLIER_BRANCH_PRODUCT : "/delete_supplier_branch_product"
        },
        //NEW 
        //added date 22/02/20
        BLOCK : {
            BLOCK_CATEGORY : "/block_category"
        }
    },

    SUPPLIERS:{
        LIST:{
            SUPPLIER_LISTING : "/admin/supplier_listing",
            GET_SUPPLIER_INFO_TAB1 : "/get_supplier_info_tab1",
            GET_SUPPLIER_INFO_TAB2 : "/get_supplier_info_tab2",
            GET_SUPPLIER_SUMMARY : "/get_supplier_summary"
        },
        CREATE:{
            ADD_BRANCH : "/add_branch",
        },
        UPDATE:{
            GET_SUPPLIER_SUB_INFO_TAB1 : "/v1/get_supplier_sub_info_tab1",
            SAVE_SUPPLIER_IMAGE_2 : "/save_supplier_image_2",
            //added date 22/02/20
            UPDATE_SUPPLIER_SUMMARY : "/update_supplier_summary"
        },
        DELETE:{
        },
        //NEW
        //added date 22/02/20
        BLOCK:{
            ACTIVE_OR_INACTIVE_SUPPLIER : "/active_or_inactive_supplier",
            CHANGE_BRANCH_STATUS : "/change_branch_status"
        }
    },

    BRANDS : {
        LIST:{
            ADMIN_BRAND_LIST : "/admin/brand_list"
        },
        CREATE:{
            ADMIN_ADD_BRAND : "/admin/add_brand"
        },
        UPDATE:{
            UPDATE_BRAND : "/update_brand"
        },
        DELETE:{
            DELETE_BRAND : "/admin/delete_brand"
        }
    },

    AGENTS:{
        LIST:{
            ADMIN_AGENT_LIST : "/admin/agent_list"
        },
        CREATE:{
            ADMIN_AGENT_CREATE : "/admin/agent_create"
        },
        UPDATE:{
            ADMIN_AGENT_UPDATE : "/admin/agent_update",
            ADMIN_RESET_AGENT_PASSWORD : "/admin/reset_agent_password"
        },
        DELETE:{
            ADMIN_DELETE_AGENT : "/admin/delete_agent"
        },
        //NEW
        BLOCK : {
            ADMIN_BLOCK_UNLBLOCK_AGENT:"/admin/block_unlblock_agent"
        }
    },

    ORDERS:{
        LIST:{
            ADMIN_ORDER_LIST : "/admin_order_list",
            ORDER_DESCRIPTION : "/order_description",
            ADMIN_AGENT_ACCORDING_AREA : "/admin/agent_according_area"
        },
        CREATE:{},
        UPDATE:{
            CONFIRM_PENDING_ORDER_BY_ADMIN : "/confirm_pending_order_by_admin",
            ORDER_PROGRESS_BY_ADMIN : "/order_progress_by_admin",
            ORDER_NEARBY_BY_ADMIN : "/order_nearby_by_admin",
            ORDER_SHIPPED_BY_ADMIN : "/order_shipped_by_admin",
            ORDER_DELIVERED_BY_ADMIN : "/order_delivered_by_admin",
            ADMIN_BOOKING_ASSIGNMENT : "/admin/booking/assignment"
        },
        DELETE:{}
    },

    BANNERS:{
        LIST:{
            LIST_ADVERTISEMENTS : "/list_advertisements"
        },
        CREATE:{
            ADD_BANNER_ADVERTISEMENT : "/add_banner_advertisement"
        },
        UPDATE:{
            ADMIN_UPDATE_BANNER_ADVERTISEMENT : "/admin/update_banner_advertisement"
        },
        DELETE:{
            DELETE_ADVERTISEMENT_NEW : "/delete_advertisement_new"
        }
    },

    PROMOTIONS:{
        LIST:{
            LIST_PROMO : "/listPromo"
        },
        CREATE:{
            ADD_PROMO : "/addPromo"
        },
        UPDATE:{
            UPDATE_PROMO : "/updatePromo"
        },
        DELETE:{
            DELETE_PROMO : "/deletePromo"
        }
    },

    USERS:{
        LIST:{
            GET_USERS : "/get_users"
        },
        CREATE:{},
        UPDATE:{
        },
        BLOCK : {
            ACTIVE_DEACTIVE_USER : "/active_deactive_user"
        },
        DELETE:{}
    },
    
    SUB_ADMINS:{
        LIST:{
            ADMIN_SUB_ADMIN_LIST : "/admin/sub_admin_list"
        },
        CREATE:{},
        UPDATE:{
            // MAKE_ADMIN_ACTIVE_OR_INACTIVE : "/make_admin_active_or_inactive"
        },
        DELETE:{}
    },

    REPORTS:{
        LIST:{
            USER_REPORT : "/user_report",
            ORDER_REPORT : "/order_report",
            SUPPLIER_REPORT : "/supplier_report",
            AGENT_REPORT : "/agent_report"
        },
        CREATE:{},
        UPDATE:{},
        DELETE:{}
    },

    ACCOUNTING:{
        LIST:{
            ADMIN_ACCOUNT_STATEMENT : "/admin_account_statement",
            ACCOUNT_PAYABLE_LIST : "/account_payable_list",
            ACCOUNT_RECEIVABLE_LIST : "/account_receivable_list"
        },
        CREATE:{},
        UPDATE:{
            ACCOUNT_PAYAMENT : "/account_payament"
        },
        DELETE:{}
    },
    
    SETTINGS:{
        LIST:{
            LIST_USERS_FOR_SETTINGS : "/list_users_for_settings",
            ADMIN_DEFAULT_ADDRESS_LIST : "/admin/default_address/list",
            ADMIN_SETTINGS_LIST : "/admin/settings_list",
            LIST_SUPPLIERS_FOR_SETTINGS : "/list_suppliers_for_settings",
            LIST_TERMSCONDITIONS : "/list_termsConditions"
        },
        CREATE:{
        },
        UPDATE:{
            ADMIN_UPDATE_TERMINOLOGIES : "/admin/update_terminologies",
            SEND_SYSTEM_EMAIL : "/send_system_email",
            SEND_PUSH_TO_CUSTOMER : "/send_push_to_customer",
            ADMIN_ADD_SETTINGS : "/admin/addSettings",
            ADMIN_DEFAULT_DDRESS_ADD : "/admin/default_ddress/add"
        },
        DELETE:{}
    }
}

const ADMIN_SECTION_CATEGORIES = {
    DASHBOARD: "DASHBOARD",
    CATALOGUE: "CATALOGUE",
    SUPPLIERS: "SUPPLIERS",
    BRANDS: "BRANDS",
    AGENTS: "AGENTS",
    ORDERS: "ORDERS",
    BANNERS: "BANNERS",
    PROMOTIONS: "PROMOTIONS",
    USERS: "USERS",
    SUB_ADMINS: "SUB ADMINS",
    REPORTS: "REPORTS",
    ACCOUNTING: "ACCOUNTING",
    SETTINGS: "SETTINGS"
}

const ADMIN_SECTIONS = {
    LIST: "LIST",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    BLOCK: "BLOCK"
}

const FILE_UPLOAD = {
    PROFILE_PIC_PREFIX: {
        ORIGINAL: 'profilePic_',
        THUMB: 'profileThumb_',
        CAT_ORIGINAL:'catPic_',
        CAT_THUMB:'catThumb_',
        GALL_ORIGINAL:"gallPic_",
        GALL_THUMB:"gallThumb_",
        FEED_THUMB:"feedThumb_",
        FEED_ORIGINAL:"feedPic_",
        CHAT_ORIGINAL:"chatFile_"
    },
    FILE_TYPES: {
        LOGO: 'LOGO',
        CAT:"CAT",
        FEED:"FEED",

        GALL:"GALL",
        DOCUMENT: 'DOCUMENT',
        OTHERS: 'OTHERS',      
        PERMIT: 'PERMIT',
        OWNERSHIP: 'OWNERSHIP',
        CHAT:"CHAT"      
    }
}

module.exports={
    SERVER:SERVER,
    ROUTE_PATH : ROUTE_PATH,
    ADMIN_SECTION_CATEGORIES : ADMIN_SECTION_CATEGORIES,
    ADMIN_SECTIONS : ADMIN_SECTIONS,
    FILE_UPLOAD : FILE_UPLOAD,
    BYPASSROUTES: BYPASSROUTES,
    DEBUG_USERS: DEBUG_USERS,
}