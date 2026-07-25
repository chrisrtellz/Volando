import { supabase } from "../supabase/client"

export type OrderStatus =
  | "Buscando mensajero"
  | "Mensajero asignado"
  | "Recogiendo pedido"
  | "En camino"
  | "Entregado"
  | "Cancelado"

export type Location = {
  lat: number
  lng: number
}

export type Order = {
  id: number

  clientId: number
  clientName: string

  pickupAddress?: string
  destinationAddress?: string

  pickup: Location
  destination: Location

  route?: Location[]

  distance: number
  price: number

  status: OrderStatus

  messengerId?: number
  messenger?: string
  messengerVehicle?: string
  messengerRating?: number

  messengerLocation?: Location
}

const ORDERS_TABLE = "orders"

// ===============================
// CREAR PEDIDO
// ===============================

export async function createOrder(order: Order) {
  const { error } = await supabase
    .from(ORDERS_TABLE)
    .insert({
      id: order.id,

      client_id: order.clientId,
      client_name: order.clientName,

      pickup_address: order.pickupAddress,
      destination_address: order.destinationAddress,

      pickup: order.pickup,
      destination: order.destination,

      route: order.route,

      distance: order.distance,
      price: order.price,

      status: order.status,

      messenger_id: order.messengerId,
      messenger: order.messenger,
      messenger_vehicle: order.messengerVehicle,
      messenger_rating: order.messengerRating,

      messenger_location: order.messengerLocation
    })

  if (error) {
    console.error("Error creando pedido:", error)
  }
}

// ===============================
// OBTENER PEDIDOS
// ===============================

export async function getOrders(): Promise<Order[]> {

  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .select("*")
    .order("id", { ascending: false })

  if (error) {
    console.error("Error obteniendo pedidos:", error)
    return []
  }

  return (data ?? []).map(item => ({
    id: item.id,

    clientId: item.client_id,
    clientName: item.client_name,

    pickupAddress: item.pickup_address,
    destinationAddress: item.destination_address,

    pickup: item.pickup,
    destination: item.destination,

    route: item.route,

    distance: Number(item.distance),
    price: Number(item.price),

    status: item.status,

    messengerId: item.messenger_id,
    messenger: item.messenger,
    messengerVehicle: item.messenger_vehicle,
    messengerRating: item.messenger_rating,

    messengerLocation: item.messenger_location
  }))
}

// ===============================
// BUSCAR PEDIDO
// ===============================

export async function getOrderById(
  id: number
): Promise<Order | undefined> {

  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error(error)
    return undefined
  }

  if (!data) {
    return undefined
  }

  return {
    id: data.id,

    clientId: data.client_id,
    clientName: data.client_name,

    pickupAddress: data.pickup_address,
    destinationAddress: data.destination_address,

    pickup: data.pickup,
    destination: data.destination,

    route: data.route,

    distance: Number(data.distance),
    price: Number(data.price),

    status: data.status,

    messengerId: data.messenger_id,
    messenger: data.messenger,
    messengerVehicle: data.messenger_vehicle,
    messengerRating: data.messenger_rating,

    messengerLocation: data.messenger_location
  }
}

// ===============================
// ACEPTAR PEDIDO
// ===============================

export async function acceptOrder(
  id: number,
  messengerId: number,
  messengerName: string,
  vehicle: string
) {

  const { error } = await supabase
    .from(ORDERS_TABLE)
    .update({
      status: "Mensajero asignado",

      messenger_id: messengerId,
      messenger: messengerName,
      messenger_vehicle: vehicle,
      messenger_rating: 5
    })
    .eq("id", id)

  if (error) {
    console.error("Error aceptando pedido:", error)
  }

}

// ===============================
// CAMBIAR ESTADO
// ===============================

export async function updateOrderStatus(
  id: number,
  status: OrderStatus
) {

  const { error } = await supabase
    .from(ORDERS_TABLE)
    .update({
      status
    })
    .eq("id", id)

  if (error) {
    console.error("Error actualizando estado:", error)
  }

}

// ===============================
// CANCELAR PEDIDO
// ===============================

export async function cancelOrder(
  id: number
) {

  await updateOrderStatus(
    id,
    "Cancelado"
  )

}

// ===============================
// ACTUALIZAR GPS DEL MENSAJERO
// ===============================

export async function updateMessengerLocation(
  id: number,
  location: Location
) {

  const { error } = await supabase
    .from(ORDERS_TABLE)
    .update({
      messenger_location: location
    })
    .eq("id", id)

  if (error) {
    console.error(
      "Error actualizando ubicación:",
      error
    )
  }

}

// ===============================
// ELIMINAR PEDIDO
// ===============================

export async function deleteOrder(
  id: number
) {

  const { error } = await supabase
    .from(ORDERS_TABLE)
    .delete()
    .eq("id", id)

  if (error) {
    console.error(
      "Error eliminando pedido:",
      error
    )
  }

}