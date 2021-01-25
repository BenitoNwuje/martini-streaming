import React from "react"
import {  useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import {Wrapper, Image, Artist, BottomEdgeDown} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"
const ShowPage = () => {
    const {wpcontent: {
        page: {
            showMeta: {
                showPageDescription,
                showPageHeaderPicture },

        },
        shows:{edges: shows}
        
    }} = useStaticQuery(graphql`
query  {
  wpcontent {
    page(id: "show", idType: URI) {
      showMeta {
        showPageDescription
        showPageHeaderPicture {
          altText
          sourceUrl
		  imageFile{
            childImageSharp {
                fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                    }
                } 
            }
        }
      }
    }
    shows {
      edges {
        node {
          show {
            release
            name
            country
            showBannerPicture {
              altText
              sourceUrl
		      imageFile{
            childImageSharp {
                fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                    }
                } 
            }
            }
          }
          slug
        }
      }
    }
  }
}

    
    
    `)
    return <Layout>
        <SEO title="Shows" />
        <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
            <div className="banner">
                <Image fluid={showPageHeaderPicture.imageFile.childImageSharp.fluid} alt={showPageHeaderPicture.altText} />
            </div>
            <div className="description">
                <h2>We are Martiniflix</h2>
                <p>{showPageDescription}</p>
            </div>
            <div className="artists">
                <h2>Our Shows</h2>
                <div className="artist-items">
                    {shows.map(({ node: {show, slug } }) => (
                       <Artist to={`/${slug}`} key={slug}>
                           <Image  fluid={show.showBannerPicture.imageFile.childImageSharp.fluid} alt={show.altText} />
                        <div className="artist-info">
                            <p>{show.name}</p>


                        </div>
                       </Artist> 
                    ))}
                </div>

            </div>

        </Wrapper>
    </Layout>
}

export default ShowPage