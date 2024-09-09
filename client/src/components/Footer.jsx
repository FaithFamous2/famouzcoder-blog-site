import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-tool-500">
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-col-1'>
                <div className='mt-5'>
                <Link to="/"className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                  <span className="ps-2 py-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-lg text-white"> Famouzcoder</span>
                      Blog
                  </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                  <div>
                  <Footer.Title title="About" />
                  <Footer.LinkGroup col>
                    <Footer.Link href='https://www.famouzcoder.com' target='_blank' rel='noopener noreferrer'>
                      Famouzcoder Project
                    </Footer.Link>

                    <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                      Famouzcoder Blog
                    </Footer.Link>
                  </Footer.LinkGroup>
                  </div>
                  <div>
                  <Footer.Title title="Follow us" />
                  <Footer.LinkGroup col>
                    <Footer.Link href='https://github.com/FaithFamous2' target='_blank' rel='noopener noreferrer'>
                      Github
                    </Footer.Link>

                    <Footer.Link href='#' target='' rel='noopener noreferrer'>

                    </Footer.Link>
                  </Footer.LinkGroup>
                  </div>

                  <div>
                  <Footer.Title title="Legal" />
                  <Footer.LinkGroup col>
                    <Footer.Link href='#'>
                      Privacy
                    </Footer.Link>

                    <Footer.Link href='#' >
                      Terms &amp; Conditions
                    </Footer.Link>
                  </Footer.LinkGroup>
                  </div>
                </div>

            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
              <Footer.Copyright href="#" by="Famouzcoder's blog" year={new Date().getFullYear()} />
              <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='https://facebook.com/ola.olowookere.54' target='_blank' rel='noopener noreferrer' icon={BsFacebook} />
                <Footer.Icon href='https://instagram.com/famouzcoder' target='_blank' rel='noopener noreferrer' icon={BsInstagram} />
                <Footer.Icon href='https://x.com/@FamousFaith_1' target='_blank' rel='noopener noreferrer' icon={BsTwitter} />
                <Footer.Icon href='https://github.com/FaithFamous2' target='_blank' rel='noopener noreferrer' icon={BsGithub} />
                <Footer.Icon href='https://linkedin.com/in/olowookere-faith-272605227' target='_blank' rel='noopener noreferrer' icon={BsLinkedin} />

              </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterCom
