export interface IPreviewDataFormat1 {
    pallet_id: number;
    pallet: string;
    skewer: string;
    internal_pallet_no: string;
    part_list: {
        pallet_id: number
        pallet: string
        skewer: string
        internal_pallet_no: string
        status: string
        id_no: string
        plan_prod_finish_ym: string
        model_code: string
        model_name: string
        serial_no: string
        country_code: string
        country_name: string
        distributor_code: string
        distributor_name: string
    }[]
    question_list: {
        id: number
        text: string
        status: boolean
        type: string
        section: number
    }[]

    doc_id: string
    doc_date: string
    packing_date: string
    distributor: string
    engine_models: {
        model_code: string
        model_name: string
        id_number: string
        serial_no: string
        is_pass: boolean
    }[]
    pallet_code: string
    checks: {
        check_no: number
        detail: string
        is_pass: boolean
    }[]
    appearance_checks: {
        id: number
        mark: boolean
        check_list: string
    }[]
    bolt: boolean
    cover_turbo: boolean
    sign: string
    changes: {
        edition: string
        date: string
        detail: string
        approve_by: string
        approve_date: string
        authorized_by: string
        created_by: string
    }[]
}

export interface IPreviewDataFormat2 {
    doc_no: string;
    del_date: string;
    ref_do_no: string;
    total_qty: string;
    invoice_no: string;
    customer_name: string;
    address: string;
    pallets: {
        item: number;
        pallet_no?: string;
        model_name: string;
        model_code: string;
        serial_no: string;
        check?: boolean[];
    }[];
    pallets_check_header: string[];
    abnormal_recode: string;
    fix_solution_abnormal: string;
    sign: string;
    prepare_by: {
        name: string;
        date: string;
        start_time: string;
    };
    deliverned_by: {
        name: string;
        date: string;
        start_time: string;
    };
    receive_by: {
        name: string;
        date: string;
        start_time: string;
    };
}




export const mockupData1: IPreviewDataFormat1 = {
    doc_id: 'KET_FM_PC_LG_003',
    doc_date: '2022-11-05T09:35:25+00:00',
    packing_date: '2022-11-05T09:35:25+00:00',
    distributor: 'Thailand',
    engine_models: [
        {
            model_code: '2JXXX-XXXXX',
            model_name: 'VXXXX-X-XX-X-XXXX',
            id_number: '10XX0XXXX',
            serial_no: 'BMLXXXX',
            is_pass: false
        },
        {
            model_code: '2JXXX-XXXXX',
            model_name: 'VXXXX-X-XX-X-XXXX',
            id_number: '10XX0XXXX',
            serial_no: 'BMLXXXX',
            is_pass: false
        },
        {
            model_code: '2JXXX-XXXXX',
            model_name: 'VXXXX-X-XX-X-XXXX',
            id_number: '10XX0XXXX',
            serial_no: 'BMLXXXX',
            is_pass: false
        },
        {
            model_code: '2JXXX-XXXXX',
            model_name: 'VXXXX-X-XX-X-XXXX',
            id_number: '10XX0XXXX',
            serial_no: 'BMLXXXX',
            is_pass: false
        },
    ],
    pallet_code: 'pallet code test',
    checks: [
        {
            check_no: 1,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 2,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 3,
            detail: '	รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 4,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 5,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 6,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 7,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 8,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 9,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 10,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 11,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 12,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 13,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 14,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
        {
            check_no: 15,
            detail: 'รุ่นของเครื่องยนต์ และสถานที่จัดส่ง ถูกต้องหรือไม่ (ตรวจสอบ Barcode ทีÉ Product Label) Engine Model and Destination correct or not ? (Check at Barcode on Product Label)',
            is_pass: false,
        },
    ],
    appearance_checks: [
        {
            id: 1,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER) f'
        },
        {
            id: 2,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 3,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 4,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 5,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 6,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 7,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 8,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 9,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
        {
            id: 10,
            mark: true,
            check_list: '1 OIL PIPE (TURBOCHARGER)'
        },
    ],
    bolt: true,
    cover_turbo: true,
    sign: 'https://www.pinclipart.com/picdir/middle/383-3835937_signatures-samples-png-png-signatures-clipart.png',
    changes: [
        {
            edition: 'Re_03',
            date: '2022-11-05T09:35:25+00:00',
            detail: 'Apply check pipe over flow to all model',
            approve_by: 'K. Murakami',
            approve_date: '2022-11-05T09:35:25+00:00',
            authorized_by: 'Atthapong K',
            created_by: 'Atthapong K'
        }
    ]
}
export const mockupData2: IPreviewDataFormat2 = {
    doc_no: '00122022002',
    del_date: '2022-11-05T09:35:25+00:00',
    ref_do_no: 'test',
    total_qty: '64',
    invoice_no: 'test_invoice',
    customer_name: 'SIAM KUBOTA Corporation Co., Ltd (Amata Nakhon Factory)',
    address: '700/867 Moo 3 Amata Nakhon Industrial Estate,Tambon Nong Ka Kha, District, Panthong District,Chon Buri 20160',
    pallets: [
        {
            item: 1,
            pallet_no: '40-831',
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
            check: [false, false, false, false]
        },
        {
            item: 2,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 3,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 4,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 5,
            pallet_no: '40-831',
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
            check: [false, false, false, false]
        },
        {
            item: 6,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 7,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 8,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 9,
            pallet_no: '40-831',
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
            check: [false, false, false, false]
        },
        {
            item: 10,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 11,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        {
            item: 12,
            model_name: 'D1803-M-DI-E_TS5T',
            model_code: '1J65813000',
            serial_no: 'BNW7201',
        },
        // {
        //     no: 1,
        //     palletNo: '40-831',
        //     palletItem: [
        //         {
        //             itemNo: 1,
        //             model_name: 'D1803-M-DI-E_TS5T',
        //             model_code: '1J65813000',
        //             serial_no: 'BNW7201',
        //         },
        //         {
        //             itemNo: 2,
        //             model_name: 'D1803-M-DI-E_TS5T',
        //             model_code: '1J65813000',
        //             serial_no: 'BNW7201',
        //         },
        //         {
        //             itemNo: 3,
        //             model_name: 'D1803-M-DI-E_TS5T',
        //             model_code: '1J65813000',
        //             serial_no: 'BNW7201',
        //         },
        //         {
        //             itemNo: 4,
        //             model_name: 'D1803-M-DI-E_TS5T',
        //             model_code: '1J65813000',
        //             serial_no: 'BNW7201',
        //         },
        //     ],
        //     check: [false, false, false, false]
        // }
    ],
    pallets_check_header: [
        'ID Tag SEQ Delivery Tag ใส่ถูกต้องหรือไม่',
        'ตำแหน่งเครื่องยนต์วางถูกต้องหรือไม่',
        'Barcode ติดที่เครื่องยนต์หรือไม่',
        'Barcode ติดที่เครื่องยนต์หรือไม่',
        'Barcode ติดที่เครื่องยนต์หรือไม่',
    ],
    abnormal_recode: 'test',
    fix_solution_abnormal: 'test',
    sign: 'https://www.pinclipart.com/picdir/middle/383-3835937_signatures-samples-png-png-signatures-clipart.png',
    prepare_by: {
        name: 'KET',
        date: '2022-11-05T09:35:25+00:00',
        start_time: '2022-11-05T09:35:25+00:00',
    },
    deliverned_by: {
        name: 'KET',
        date: '2022-11-05T09:35:25+00:00',
        start_time: '2022-11-05T09:35:25+00:00',
    },
    receive_by: {
        name: 'KET',
        date: '2022-11-05T09:35:25+00:00',
        start_time: '2022-11-05T09:35:25+00:00',
    },
}


export type TDataPreview = IPreviewDataFormat1 | IPreviewDataFormat2