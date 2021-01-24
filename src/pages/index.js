import React from "react"
import {  useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

import {Wrapper, Image, Artist} from "./pageStyles/pageStyles"
import {COLORS} from "../constants"


const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedShows,
			    homePageHeaderDescription,
          homePageHeaderPicture ,
          homePageHeaderTitle,
        },
      },
    },
  } = useStaticQuery(graphql`
  query {
  wpcontent {
	page(id: "home", idType: URI) {
		homeMeta {
			homePageDescription
			homePageHeaderDescription
			homePageHeaderTitle
			homePageHeaderPicture {
        altText
        sourceUrl
				imageFile{
         childImageSharp {
           fluid(quality: 100) {
             ...GatsbyImageSharpFluid_withWebp
           }
         } 
        }
			}
			homePageFeaturedShows {
				... on WPGraphql_Show {
					slug
					show {
						country
              description
              fieldGroupName
              name
              release
              showBannerPicture {
							altText
              sourceUrl
				      imageFile{
                childImageSharp {
                fluid(quality: 50) {
                  ...GatsbyImageSharpFluid_withWebp
           }
         } 
        }
						}
					}
				}
			}
		}
	}
  }
}
  
  `)
  return (<Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
      <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText}  />
      <div className="inner-div">
        <p className="header-title">{homePageHeaderTitle}</p>
        <p className="header-description">{homePageHeaderDescription}</p>
      </div>
      </div>
      <div className="description">
          <p>{homePageDescription}</p>
      </div>
      <div className="artists"> 
          <h2>Featured Shows</h2>
          <div className="artist-item">
            {homePageFeaturedShows.map(({show, slug}) =>(
              <Artist key={slug} to={`/${slug}`}>
                <Image 
                  fluid={show.showBannerPicture.imageFile.childImageSharp.fluid} 
                  alt={show.showBannerPicture.altText} />
                <div className="artist-info">
                <p>{show.name}</p>

                </div>

              </Artist>
            ))}
          </div>
      </div>
    </Wrapper>
  </Layout>)
}

export default IndexPage
