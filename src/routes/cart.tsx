import { createFileRoute } from '@tanstack/react-router'
import ProfileCartComponent from '../components/profile-cart-component'

export const Route = createFileRoute('/cart')({
  component: ProfileCartComponent,
})
