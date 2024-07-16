import Breadcrumb from '@/components/Common/Breadcrumb'
import Password from '@/components/Password/Password'
import React from 'react'

const Passwordpage = () => {
  return (
    <>
    <Breadcrumb
        pageName="كلمة السر "
        description={``}
      />
      <Password/>
    </>
  )
}

export default Passwordpage