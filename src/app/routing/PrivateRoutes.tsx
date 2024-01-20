import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
// import {DcumentManagerWrapper} from '../pages/dashboard/DcumentManagerWrapper'
import { DcumentManagerWrapper } from '../pages/dashboard/FileManager/DocumentManagerWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import BreweriesTable from '../lists/breweries/Table'
import TrailsTable from '../lists/trails/Table'
import ParticipantTable from "../lists/participants/Table"
import PointsTable from "../lists/points/Table"
import VisitsTable from "../lists/visits/Table"
import SpecialEvent from '../pages/form/specialEvent'
import FeatureRequest from '../pages/form/featureRequest'
import ReportBug from '../pages/form/reportBug'
import AdminDashboard from '../../admin/dashboard/Dashboard'
import EventsForm from '../pages/Events/Event'
import { NewPassword } from '../modules/auth/components/ResetPassword'
import Membershipdash from '../pages/membershipDashboard/Membershipdash'
import UserList from '../../admin/dashboard/Userlist'
import OverallPoint from '../../admin/Overall'
import HistoricTable from '../lists/historic/table'
import Username from '../pages/username'
import Marketingform from '../pages/form/marketing'
import Business from '../pages/form/bussiness'




const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {/* <Route path='auth/*' element={<Navigate to='/dashboard' />} /> */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='user-list' element={<UserList />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='membership-dashboard' element={<Membershipdash />} />
        <Route path='documentManager' element={<DcumentManagerWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path="lists/breweries" element={<BreweriesTable />} />
        <Route path="lists/trails" element={<TrailsTable />} />
        <Route path="lists/participants" element={<ParticipantTable />} />
        <Route path="lists/points" element={<PointsTable />} />
        <Route path="lists/visits" element={<VisitsTable />} />
        <Route path="brewery-event/special-event" element={<SpecialEvent />} />
        <Route path="brewery-event/feature-request" element={<FeatureRequest />} />
        <Route path="brewery-event/marketing-text" element={<Marketingform />} />
        <Route path="brewery-event/update-business" element={<Business />} />
        <Route path="brewery-event/report-bug" element={<ReportBug />} />
        <Route path="events/events-iframe/:id" element={<EventsForm />} />
        <Route path="overall-points/:id" element={<OverallPoint />} />
        <Route path="points/historic-trails/:id" element={<HistoricTable />} />
        
        <Route path="username" element={<Username />} />

        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
