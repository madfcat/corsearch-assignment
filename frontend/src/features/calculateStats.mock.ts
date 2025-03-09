import { Mode } from "../gql/graphql";
import { Leg } from "../types/types";

export const legsData: Leg[] = [
    {
        "__typename": "Leg",
        "id": null,
        "duration": 432,
        "mode": Mode.Walk,
        "distance": 496.82,
        "start": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:00:48+02:00"
        },
        "end": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:08:00+02:00"
        },
        "legGeometry": {
            "__typename": "Geometry",
            "length": 37,
            "points": "qkdnJkgawCEAQiAb@i@dBoAB???RMB?NMHIDClAMX?@W?S@[AO?g@AYCaBEkB?a@?CASzAgBlA{AXZDDBI@KDO@M@GBODD^b@"
        },
        "from": {
            "__typename": "Place",
            "stop": null,
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:00:48+02:00"
            }
        },
        "to": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "name": "Bunkkerinaukio",
                "code": "H0236",
                "lat": 60.154292,
                "lon": 24.919644,
                "vehicleMode": Mode.Tram
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:08:00+02:00"
            }
        },
        "intermediateStops": null,
        "route": null
    },
    {
        "__typename": "Leg",
        "id": "rO0ABXdoABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAHEhTTDoxMDA3VF8yMDI1MDMwNl9MYV8xXzI0MDcACjIwMjUtMDMtMDgAAAABAAAABwALSFNMOjEyMDM0MTAAC0hTTDoxMDIwNDUzAAA=",
        "duration": 600,
        "mode": Mode.Tram,
        "distance": 2542.95,
        "start": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:08:00+02:00"
        },
        "end": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:18:00+02:00"
        },
        "legGeometry": {
            "__typename": "Geometry",
            "length": 113,
            "points": "k{cnJkbbwCY[eAiAmAqAo@s@gBmBgBqBMOKGICICOB{@H{APsD^yCZk@FqAVUB??[@MCKOMc@Sk@IMGKOCQ?cEd@S?MGGGIQKYm@aCOk@Ok@KYKEGCK@KJKNKPQZ??g@p@OPMD[Fu@NO@O?MGIIOY{@mDcA}DyA{Fu@eCa@kB??Mk@q@mCk@cCoAcFAQAQAa@Cu@EQEQCMGGQM_Aa@{@_@{@a@oAc@??[OIKGMGOaAcEi@wBUaAEQ?Q?WBYN[l@cAFQ@W?YCQG_@k@kB??YiA[iAu@mCkB}Gi@qBMg@Mg@CQI]CSAo@EoF"
        },
        "from": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "lon": 24.919644,
                "name": "Bunkkerinaukio",
                "code": "H0236",
                "lat": 60.154292,
                "vehicleMode": Mode.Tram
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:08:00+02:00"
            }
        },
        "to": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "name": "Rautatieasema",
                "code": "H0301",
                "lat": 60.170354,
                "lon": 24.941006,
                "vehicleMode": Mode.Tram
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:18:00+02:00"
            }
        },
        "intermediateStops": [
            {
                "__typename": "Stop",
                "code": "H0297",
                "desc": "Tyynenmerenkatu",
                "lat": 60.159938,
                "lon": 24.921436,
                "name": "Huutokonttori"
            },
            {
                "__typename": "Stop",
                "code": "H0820",
                "desc": "Ruoholahdenranta",
                "lat": 60.162826,
                "lon": 24.923134,
                "name": "Länsilinkki"
            },
            {
                "__typename": "Stop",
                "code": "H0822",
                "desc": "Ruoholahdenkatu",
                "lat": 60.165425,
                "lon": 24.92697,
                "name": "Ruoholahden villat"
            },
            {
                "__typename": "Stop",
                "code": "H0824",
                "desc": "Malminrinne",
                "lat": 60.16795,
                "lon": 24.931494,
                "name": "Kampintori"
            },
            {
                "__typename": "Stop",
                "code": "H0232",
                "desc": "Simonkatu",
                "lat": 60.168809,
                "lon": 24.935728,
                "name": "Simonkatu"
            }
        ],
        "route": {
            "__typename": "Route",
            "longName": "Länsiterm. - Rautatieasema - Kruununhaka - Katajanokan term.",
            "shortName": "7T"
        }
    },
    {
        "__typename": "Leg",
        "id": null,
        "duration": 149,
        "mode": Mode.Walk,
        "distance": 143.67,
        "start": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:18:00+02:00"
        },
        "end": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:20:29+02:00"
        },
        "legGeometry": {
            "__typename": "Geometry",
            "length": 19,
            "points": "u_gnJyifwCAw@E?E@E?I@M?A?IOAA?C?ACgC?CFeAAK?MGuACD"
        },
        "from": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "lon": 24.941006,
                "name": "Rautatieasema",
                "code": "H0301",
                "lat": 60.170354,
                "vehicleMode": Mode.Tram
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:18:00+02:00"
            }
        },
        "to": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "name": "Rautatientori",
                "code": "H2041",
                "lat": 60.17072,
                "lon": 24.94324,
                "vehicleMode": Mode.Bus
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:20:29+02:00"
            }
        },
        "intermediateStops": null,
        "route": null
    },
    {
        "__typename": "Leg",
        "id": "rO0ABXdoABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAHEhTTDoxMDc3Tl8yMDI1MDMwNl9MYV8xXzI0MjIACjIwMjUtMDMtMDgAAAAAAAAAAwALSFNMOjEwMjAxMTMAC0hTTDoxMTAwMTI1AAA=",
        "duration": 360,
        "mode": Mode.Bus,
        "distance": 1868.05,
        "start": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:22:00+02:00"
        },
        "end": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:28:00+02:00"
        },
        "legGeometry": {
            "__typename": "Geometry",
            "length": 62,
            "points": "abgnJkvfwCx@iCJc@Cm@CYKq@[wAW}@iAkFe@iBQ_@QYYO_@Q]Yu@{@mAwAk@o@uAoBm@u@US_@k@Qg@IQIQ[UMCED_@Ko@DeADS@??[BmCHqDRYFGkHI]OKcERa@@E@CaB]BcBD}AF??YC[@y@DMBGH{@zAGR{@eDgFeSc@eB[cAi@sAWk@o@{A"
        },
        "from": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "lon": 24.94324,
                "name": "Rautatientori",
                "code": "H2041",
                "lat": 60.17072,
                "vehicleMode": Mode.Bus
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:22:00+02:00"
            }
        },
        "to": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "name": "Haapaniemi",
                "code": "H2407",
                "lat": 60.182704,
                "lon": 24.95759,
                "vehicleMode": Mode.Bus
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:28:00+02:00"
            }
        },
        "intermediateStops": [
            {
                "__typename": "Stop",
                "code": "H2061",
                "desc": "Unioninkatu 43",
                "lat": 60.17502,
                "lon": 24.95049,
                "name": "Kaisaniemenpuisto"
            },
            {
                "__typename": "Stop",
                "code": "H2504",
                "desc": "Hakaniemen torikatu",
                "lat": 60.17938,
                "lon": 24.95226,
                "name": "Hakaniemi"
            }
        ],
        "route": {
            "__typename": "Route",
            "longName": "Rautatientori-Arabia-Malmi-Jakomäki",
            "shortName": "77N"
        }
    },
    {
        "__typename": "Leg",
        "id": null,
        "duration": 736,
        "mode": Mode.Walk,
        "distance": 674.96,
        "start": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:28:00+02:00"
        },
        "end": {
            "__typename": "LegTime",
            "scheduledTime": "2025-03-09T00:40:16+02:00"
        },
        "legGeometry": {
            "__typename": "Geometry",
            "length": 82,
            "points": "olinJioiwCd@hADJZx@@@BC@A@?Rd@DJKTIPCDGNITBJGVCHGRCHABABCJCHAFOd@IXIXQl@ADITENGVM^AFCJCB?BCDAFADCDAF?@CFENK\\A@EPOUEIACCEEGMU]m@GIe@w@[k@k@eAAe@QSQQ?DE?k@o@q@u@EPEROn@Qr@CLGNCJKd@KZ?@A?s@DE?c@s@GZ"
        },
        "from": {
            "__typename": "Place",
            "stop": {
                "__typename": "Stop",
                "lon": 24.95759,
                "name": "Haapaniemi",
                "code": "H2407",
                "lat": 60.182704,
                "vehicleMode": Mode.Bus
            },
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:28:00+02:00"
            }
        },
        "to": {
            "__typename": "Place",
            "stop": null,
            "departure": {
                "__typename": "LegTime",
                "scheduledTime": "2025-03-09T00:40:16+02:00"
            }
        },
        "intermediateStops": null,
        "route": null
    }
]