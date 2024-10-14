import { type CreateActivityReviewType, type ActivityType } from '@/types/activities'
import axios from 'axios'

class ActivitiesService {
  httpInstance = axios.create({
    baseURL: '/api',
  })

  public async get(): Promise<ActivityType[] | undefined> {
    const response = await this.httpInstance.get<ActivityType[]>('/activities')

    return response.data
  }

  public async create(activityReview: CreateActivityReviewType): Promise<ActivityType | undefined> {
    console.log(activityReview)
    const exampleActivity: ActivityType = {
      created_at: '2024-09-15T14:45:00+00:00',
      activity_host_id: 'd1b49c7c-d7e6-475e-96d7-0023eb0a1857',
      title: activityReview.detail.name,
      description: activityReview.detail.description,
      start_date: activityReview.detail.date,
      end_date: '2024-11-02T15:00:00+00:00',
      full_address: 'Eco Center, 123 Greenway Drive, Austin, TX, USA',
      badge_contract_address: '0x1234abcd5678ef90',
      requirements: activityReview.requirementsRewards.requirements.toString(),
      location: activityReview.detail.location,
      points: `${activityReview.requirementsRewards.kolectivoPoints}`,
      stamp: activityReview.requirementsRewards.stamps,
      banner_src: activityReview.banner,
    }
    const response = await this.httpInstance.post<ActivityType>('/activities', exampleActivity)
    return response.data
  }
}

const activitiesService = new ActivitiesService()
export default activitiesService