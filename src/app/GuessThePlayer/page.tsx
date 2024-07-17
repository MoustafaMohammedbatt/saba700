import Breadcrumb from '@/components/Common/Breadcrumb'
import GuessPlayer from '@/components/GuessPlayer/GuessPlayer'
import React from 'react'

const Guesspage = () => {
  return (
    <>
    <Breadcrumb
        pageName="من اللاعب"
        description={``}
      />
      <GuessPlayer/>
    </>
  )
}

export default Guesspage