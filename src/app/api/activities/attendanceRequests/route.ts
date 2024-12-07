import { type AttendanceRequest } from '@/types/activities'
import { createClient } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// const bannerBasePath = process.env.NEXT_PUBLIC_ACTIVITIES_ATTENDANCE_PROOFS_PATH || ''
const ATTENDANCEREQUESTS = 'attendance_requests'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const activityId = searchParams.get('activity_id')
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.from(ATTENDANCEREQUESTS).select('*').eq('activity_id', activityId)
  if (error) return NextResponse.json(error)
  const attendanceRequestsWithProofImage = await Promise.all(
    data.map(async (request) => {
      const proofImage = await downloadFile(supabaseBucket, request.proof_image_path)
      return { ...request, proof_image: proofImage }
    }),
  )
  return NextResponse.json(attendanceRequestsWithProofImage)
}

export async function PUT(req: NextRequest) {
  const updatedAttendanceRequests = (await req.json()) as AttendanceRequest[]
  updatedAttendanceRequests.forEach((attendanceRequest) => {
    const update = async () => {
      const { data, error } = await updateAttendanceRequest(attendanceRequest)
      if (error) return NextResponse.json(error)
      if (data) return NextResponse.json(data)
    }
    update()
  })
  return NextResponse.json({ Ok: true })
}

async function updateAttendanceRequest(attendanceRequest: AttendanceRequest) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { PocImage: banner_src, ...attendanceRequestWhitoutPocImage } = attendanceRequest
  console.log('Removed ', banner_src?.substring(0, 10))

  const { data, error } = await supabaseClient
    .from(ATTENDANCEREQUESTS)
    .update({
      id: attendanceRequestWhitoutPocImage.id,
      activity_id: attendanceRequestWhitoutPocImage.activityId,
      check_in: attendanceRequestWhitoutPocImage.checkIn,
      check_out: attendanceRequestWhitoutPocImage.checkOut,
      created_at: attendanceRequestWhitoutPocImage.createdAt,
      deny_reason: attendanceRequestWhitoutPocImage.denialReason,
      notes: attendanceRequestWhitoutPocImage.Poc,
      proof_image_path: attendanceRequestWhitoutPocImage.PocImagePath,
      report_path: attendanceRequestWhitoutPocImage.reportPath,
      state: attendanceRequestWhitoutPocImage.state,
      transactionLink: attendanceRequestWhitoutPocImage.payoutTransactionLink,
      user_name: attendanceRequestWhitoutPocImage.user,
      wallet_address: attendanceRequestWhitoutPocImage.address,
    })
    .eq('id', attendanceRequest.id)
    .select()
  return { data, error }
}

async function downloadFile(bucketName: string, filePath: string) {
  if (filePath == '' || !filePath) return ''
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabaseClient.storage.from(bucketName).download(filePath)
  console.log('ImageResponse: ', data)

  if (error) {
    console.error('Error downloading file:', error.message)
  } else {
    const mimeType = filePath.endsWith('png') ? 'image/png' : 'image/jpeg'
    const base64 = await blobToImageSrc(data)
    const imageSource = `data:${mimeType};base64,${base64}`
    return imageSource
  }
}
async function blobToImageSrc(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString('base64')
}