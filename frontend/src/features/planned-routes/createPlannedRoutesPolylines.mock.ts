import { Mode } from "../../gql/graphql";
import { Edges } from "../../types/types";

export const edgesData: Edges = [
	{
		__typename: "PlanEdge",
		node: {
			__typename: "Itinerary",
			duration: 1252,
			emissionsPerPerson: {
				__typename: "Emissions",
				co2: 104.31942857142857,
			},
			walkDistance: 879.8,
			walkTime: 876,
			legs: [
				{
					__typename: "Leg",
					id: null,
					duration: 405,
					mode: Mode.Walk,
					distance: 459.89,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:27:17+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:34:02+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 59,
						points:
							"odhnJaocwCMD?L?D?J@JDv@?BRGDAp@WBa@@]@M@S@UBg@?M?E?G?GCGACCEUGGBK@EBC@IBWHSHG@KDKDE@MDIBIBKDQFQFMDMDAYAS?CACW}E@GCWEWKoBCi@RUHKFKDGFG",
					},
					from: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:27:17+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Hesperian puisto",
							code: "H1908",
							lat: 60.17712,
							lon: 24.929799,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:34:02+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
				{
					__typename: "Leg",
					id: "rO0ABXdnABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAG0hTTDoyMjAwXzIwMjUwMzA2X1N1XzJfMjE0OAAKMjAyNS0wMy0wOQAAAB8AAAAgAAtIU0w6MTEzMDEwNwALSFNMOjEwMjAxMjgAAA==",
					duration: 145,
					mode: Mode.Bus,
					distance: 1123.44,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:34:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:37:00+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 28,
						points:
							"cjhnJqbdwCjA_B`BwBdAsA`CgCbBeB~A{ApBgBOe@g@gBgAgDMg@Gc@Cc@IaJAcAAiC`@KdBKv@B^AfAGV_@f@QfBU|Dq@Lo@@[",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.929799,
							name: "Hesperian puisto",
							code: "H1908",
							lat: 60.17712,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:34:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Elielinaukio",
							code: "H2020",
							lat: 60.171203,
							lon: 24.93958,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:37:00+02:00",
						},
					},
					intermediateStops: [],
					route: {
						__typename: "Route",
						longName: "Elielinaukio-Leppävaara-Espoon keskus",
						shortName: "200",
					},
				},
				{
					__typename: "Leg",
					id: null,
					duration: 203,
					mode: Mode.Walk,
					distance: 189.6,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:36:27+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:39:50+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 19,
						points: "}dgnJ{_fwC?_@b@a@~@s@B?@?V?D?B??SA_@FAH?@?@?@fC@?PA@xA",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.93958,
							name: "Elielinaukio",
							code: "H2020",
							lat: 60.171203,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:36:27+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Rautatientori",
							code: "H0019",
							lat: 60.170379,
							lon: 24.939846,
							vehicleMode: Mode.Subway,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:39:50+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
				{
					__typename: "Leg",
					id: "rO0ABXdnABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAG0hTTDozMU0xXzIwMjUwMzA2X1N1XzFfMjIxMQAKMjAyNS0wMy0wOQAAAA8AAAARAAtIU0w6MTAyMDYwMQALSFNMOjExMTE2MDEAAA==",
					duration: 135,
					mode: Mode.Subway,
					distance: 1514.3,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:41:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:44:00+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 27,
						points:
							"}~fnJ{`fwCIiFAiFIqDO}BWaD]mCY}Be@{CUaAUeAi@gBm@iAUYYU??uBwBgCgCyCqCcBq@aASuBBuEJgSx@mAFg@@e@D",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.939846,
							name: "Rautatientori",
							code: "H0019",
							lat: 60.170379,
							vehicleMode: Mode.Subway,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:41:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Hakaniemi",
							code: "H0023",
							lat: 60.180481,
							lon: 24.950188,
							vehicleMode: Mode.Subway,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:44:00+02:00",
						},
					},
					intermediateStops: [
						{
							__typename: "Stop",
							code: "H0021",
							desc: "Fabianinkatu",
							lat: 60.172009,
							lon: 24.947915,
							name: "Helsingin yliopisto",
						},
					],
					route: {
						__typename: "Route",
						longName: "Kivenlahti - Vuosaari",
						shortName: "M1",
					},
				},
				{
					__typename: "Leg",
					id: null,
					duration: 268,
					mode: Mode.Walk,
					distance: 230.31,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:43:41+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:48:09+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 23,
						points:
							"}_inJcbhwCg@B?RM?@jAcBH?]J?DBDEBF@@BF@DBK@G@E@CDOB@HA\\mAf@gB",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.950188,
							name: "Hakaniemi",
							code: "H0023",
							lat: 60.180481,
							vehicleMode: Mode.Subway,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:43:41+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:48:09+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
			],
			waitingTime: 96,
			start: "2025-03-09T22:27:17+02:00",
			numberOfTransfers: 1,
			generalizedCost: 2070,
			end: "2025-03-09T22:48:09+02:00",
		},
	},
	{
		__typename: "PlanEdge",
		node: {
			__typename: "Itinerary",
			duration: 1239,
			emissionsPerPerson: {
				__typename: "Emissions",
				co2: 104.31942857142857,
			},
			walkDistance: 678.1800000000001,
			walkTime: 585,
			legs: [
				{
					__typename: "Leg",
					id: null,
					duration: 405,
					mode: Mode.Walk,
					distance: 459.89,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:28:47+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:35:32+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 59,
						points:
							"odhnJaocwCMD?L?D?J@JDv@?BRGDAp@WBa@@]@M@S@UBg@?M?E?G?GCGACCEUGGBK@EBC@IBWHSHG@KDKDE@MDIBIBKDQFQFMDMDAYAS?CACW}E@GCWEWKoBCi@RUHKFKDGFG",
					},
					from: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:28:47+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Hesperian puisto",
							code: "H1908",
							lat: 60.17712,
							lon: 24.929799,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:35:32+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
				{
					__typename: "Leg",
					id: "rO0ABXdnABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAG0hTTDo0MzAwXzIwMjUwMzA2X1N1XzJfMjIwMAAKMjAyNS0wMy0wOQAAABsAAAAcAAtIU0w6MTEzMDEwNwALSFNMOjEwMjAxMjgAAA==",
					duration: 148,
					mode: Mode.Bus,
					distance: 1123.44,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:35:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:38:00+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 28,
						points:
							"cjhnJqbdwCjA_B`BwBdAsA`CgCbBeB~A{ApBgBOe@g@gBgAgDMg@Gc@Cc@IaJAcAAiC`@KdBKv@B^AfAGV_@f@QfBU|Dq@Lo@@[",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.929799,
							name: "Hesperian puisto",
							code: "H1908",
							lat: 60.17712,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:35:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Elielinaukio",
							code: "H2020",
							lat: 60.171203,
							lon: 24.93958,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:38:00+02:00",
						},
					},
					intermediateStops: [],
					route: {
						__typename: "Route",
						longName: "Elielinaukio-Myyrmäki",
						shortName: "300",
					},
				},
				{
					__typename: "Leg",
					id: null,
					duration: 154,
					mode: Mode.Walk,
					distance: 182.05,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:38:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:40:34+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 17,
						points: "}dgnJ{_fwC?_@LqBA}@AgBAgBAoBA[?E?E?E?C?O?K?KDGH?",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.93958,
							name: "Elielinaukio",
							code: "H2020",
							lat: 60.171203,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:38:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Rautatientori",
							code: "H2044",
							lat: 60.17108,
							lon: 24.94283,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:40:34+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
				{
					__typename: "Leg",
					id: "rO0ABXdnABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAG0hTTDoxMDIzXzIwMjUwMzA2X1N1XzFfMjI0NAAKMjAyNS0wMy0wOQAAAAAAAAADAAtIU0w6MTAyMDExNgALSFNMOjExMTI0MDQAAA==",
					duration: 300,
					mode: Mode.Bus,
					distance: 1576.02,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:44:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:49:00+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 58,
						points:
							"edgnJatfwCd@G\\aAx@iCJc@Cm@CYKq@[wAW}@iAkFe@iBQ_@QYYO_@Q]Yu@{@mAwAk@o@uAoBm@u@US??_@k@Qg@IQIQ[UMCED_@Ko@DeADS@[BmCHqDRYFGkHI]OKcERa@@E@CaB]BcBD??}AFYC[@a@BYDMD_A~AQd@uAfF",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.94283,
							name: "Rautatientori",
							code: "H2044",
							lat: 60.17108,
							vehicleMode: Mode.Bus,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:44:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Arenatalo",
							code: "H2091",
							lat: 60.180859,
							lon: 24.950289,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:49:00+02:00",
						},
					},
					intermediateStops: [
						{
							__typename: "Stop",
							code: "H2059",
							desc: "Kaisaniemenkatu",
							lat: 60.173545,
							lon: 24.94981,
							name: "Kaisaniemenpuisto",
						},
						{
							__typename: "Stop",
							code: "H2520",
							desc: "Hakaniemen Torikatu",
							lat: 60.1789,
							lon: 24.952257,
							name: "Hakaniemi",
						},
					],
					route: {
						__typename: "Route",
						longName: "Rautatientori-Pasila-Pirkkola",
						shortName: "23",
					},
				},
				{
					__typename: "Leg",
					id: null,
					duration: 26,
					mode: Mode.Walk,
					distance: 36.24,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:49:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:49:26+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 2,
						points: "uainJybhwCf@gB",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.950289,
							name: "Arenatalo",
							code: "H2091",
							lat: 60.180859,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:49:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:49:26+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
			],
			waitingTime: 206,
			start: "2025-03-09T22:28:47+02:00",
			numberOfTransfers: 1,
			generalizedCost: 1923,
			end: "2025-03-09T22:49:26+02:00",
		},
	},
	{
		__typename: "PlanEdge",
		node: {
			__typename: "Itinerary",
			duration: 1364,
			emissionsPerPerson: {
				__typename: "Emissions",
				co2: 0,
			},
			walkDistance: 1254.51,
			walkTime: 1113,
			legs: [
				{
					__typename: "Leg",
					id: null,
					duration: 315,
					mode: Mode.Walk,
					distance: 325.22,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:27:25+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:32:40+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 42,
						points:
							"odhnJaocwCMD?L?D?J@JDv@?BQHWH@N?H@F@XBd@Dl@?LDp@@L@N@TB\\Bf@@T@P@TFz@?HB\\?HBd@BR?P@N@FDj@C~@AXVJAN?L{@O",
					},
					from: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:27:25+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Apollonkatu",
							code: "H0207",
							lat: 60.176336,
							lon: 24.922276,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:32:40+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
				{
					__typename: "Leg",
					id: "rO0ABXdpABhTQ0hFRFVMRURfVFJBTlNJVF9MRUdfVjMAHUhTTDoxMDAxSDdfMjAyNTAzMDZfU3VfMV8yMjE2AAoyMDI1LTAzLTA5AAAADQAAABEAC0hTTDoxMTMwNDQyAAtIU0w6MTEyMTQ0NgAA",
					duration: 251,
					mode: Mode.Tram,
					distance: 1684.49,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:33:00+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:38:00+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 83,
						points:
							"mehnJasbwCUEqAUWC[Ko@Ka@Gg@Gg@Gi@Ki@Ki@GSGUCKCGCKKOM[k@_@e@IIUQa@W??[UMMIKoAmAKMOQKSQ_@Ws@Wq@Sw@M[Us@I[[}@K]K]Wy@o@wBKUEYu@iD??{@uDWkAWgAUiAKc@M_@Si@MMMMOKQGgBu@kBm@??QMKGIIQa@Ic@AMAQSaCQ_C]eE[kEc@uFYwD[uDMcBMeBEc@C_@?aAGy@I_AG_A",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.922276,
							name: "Apollonkatu",
							code: "H0207",
							lat: 60.176336,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:33:00+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							name: "Linnanmäki (etelä)",
							code: "H0245",
							lat: 60.186052,
							lon: 24.941642,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:38:00+02:00",
						},
					},
					intermediateStops: [
						{
							__typename: "Stop",
							code: "H0209",
							desc: "Runeberginkatu 55",
							lat: 60.179632,
							lon: 24.923713,
							name: "Töölöntori",
						},
						{
							__typename: "Stop",
							code: "H0241",
							desc: "Helsinginkatu",
							lat: 60.182165,
							lon: 24.928686,
							name: "Ooppera",
						},
						{
							__typename: "Stop",
							code: "H0243",
							desc: "Helsinginkatu",
							lat: 60.18445,
							lon: 24.93198,
							name: "Kaupunginpuutarha",
						},
					],
					route: {
						__typename: "Route",
						longName: "Käpylä - Ruskeasuo",
						shortName: "1H",
					},
				},
				{
					__typename: "Leg",
					id: null,
					duration: 798,
					mode: Mode.Walk,
					distance: 929.29,
					start: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:36:51+02:00",
					},
					end: {
						__typename: "LegTime",
						scheduledTime: "2025-03-09T22:50:09+02:00",
					},
					legGeometry: {
						__typename: "Geometry",
						length: 54,
						points:
							"sajnJ}kfwCJvADADCFt@@JFr@@J@V@LFUtAaFDSFW`BwFFQDSbCsIFSFS`BuFpAqEFUDSTs@J]J]DODOFUHYFSFSFSHYBIDKHW@EH]H[HWtDSD?@DBK@G@E@CDOB@HA\\mAf@gB",
					},
					from: {
						__typename: "Place",
						stop: {
							__typename: "Stop",
							lon: 24.941642,
							name: "Linnanmäki (etelä)",
							code: "H0245",
							lat: 60.186052,
							vehicleMode: Mode.Tram,
						},
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:36:51+02:00",
						},
					},
					to: {
						__typename: "Place",
						stop: null,
						departure: {
							__typename: "LegTime",
							scheduledTime: "2025-03-09T22:50:09+02:00",
						},
					},
					intermediateStops: null,
					route: null,
				},
			],
			waitingTime: 0,
			start: "2025-03-09T22:27:25+02:00",
			numberOfTransfers: 0,
			generalizedCost: 2352,
			end: "2025-03-09T22:50:09+02:00",
		},
	},
];
