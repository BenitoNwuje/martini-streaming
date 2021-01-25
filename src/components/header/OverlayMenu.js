import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import {
    OverlayWrapper,
    Image,
    CloseButton,
    MenuList
} from '../../headerStyles/headerStyles'
const OverlayMenu = ({handleOverlayMenu, menuOpen}) => {
    const {
        logo,
        wpcontent: {menuItems},  
      } = useStaticQuery(graphql`
      query{
        logo: file(relativePath: {eq: "logo.png"}) {
        childImageSharp {
          fixed(quality: 100, width: 200){
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }    wpcontent {
        menuItems {
          edges {
            node {
              label
              path
            }
          }
        }
      }
      }
      `)
    return (
      <>
      {menuOpen && (
          <OverlayWrapper>
              <CloseButton onClick={handleOverlayMenu}>X</CloseButton>
              <Link to="/" style={{marginBottom:"1.5rem"}}>
                  <Image alt="logo artist agency martini" fixed={logo.childImageSharp.fixed} />
              </Link>
              <MenuList style={{flexDirection:"column"}}> 
              {/* zorgt ervoor dat items onder elkaar zullen zijn en inline stylinging noemt dit  */}
              {menuItems.edges.map(({node: item}, i) => (
                  <li key={i}>
                      <Link activeClassName="nav-active" to={item.path}>
                          {item.label}
                      </Link>
                  </li>
              ))}
              </MenuList>
          </OverlayWrapper>
      )}
  </>
    )
}

export default OverlayMenu
