import { gql } from "@apollo/client";

export const RENTAL_STATIONS = gql`
	query rentalStations {
		vehicleRentalStations {
			allowDropoff
			allowDropoffNow
			allowOverloading
			allowPickup
			allowPickupNow
			id
			lat
			lon
			name
			operative
			realtime
			stationId
			capacity
			availableVehicles {
				total
				byType {
					count
					vehicleType {
						formFactor
						propulsionType
					}
				}
			}
			rentalNetwork {
				networkId
				url
			}
			availableSpaces {
				byType {
					count
					vehicleType {
						formFactor
						propulsionType
					}
				}
				total
			}
		}
	}
`;
