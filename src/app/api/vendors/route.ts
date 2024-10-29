import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Bucket from '@/utils/supabase/bucket'
import { createClient } from '@/utils/supabase/server'
import { type Vendor } from '@/types/vendors'

const VENDORS = 'vendors'

export async function GET() {
  const supabaseClient = createClient()
  const { data, error } = await supabaseClient.from(VENDORS).select('*')
  if (error) return NextResponse.json(error, { status: 500 })

  const vendorsWithLogos = await Promise.all(
    data.map(async (vendor) => {
      const logoSrc = await Bucket.downloadFile(`vendors/logo/${vendor.id}`)
      return {
        id: vendor.id,
        name: vendor.name,
        location: vendor.location,
        website: vendor.website,
        phone: vendor.phone,
        category: vendor.category,
        openingHours: vendor.opening_hour,
        wifiAvailability: vendor.wifi,
        logoSrc,
      }
    }),
  )

  return NextResponse.json(vendorsWithLogos)
}

export async function POST(req: NextRequest) {
  const supabaseClient = createClient()

  const newVendor = (await req.json()) as Vendor

  const logoSrc = newVendor.logoSrc!
  delete newVendor.logoSrc

  const { data, error } = await supabaseClient
    .from(VENDORS)
    .insert([
      {
        location: newVendor.location,
        wifi: newVendor.wifiAvailability,
        website: newVendor.website,
        phone: newVendor.phone,
        category: newVendor.category,
        name: newVendor.name,
        opening_hour: newVendor.openingHours,
      },
    ])
    .select()

  if (error) return NextResponse.json(error, { status: 500 })

  const vendorId = data[0].id
  const logoPath = `vendors/logo/${vendorId}`
  await Bucket.uploadFile(logoPath, logoSrc)

  return NextResponse.json(data[0])
}