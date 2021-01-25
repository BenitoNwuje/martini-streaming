import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image, } from './templateStyles/showStyles'
 const ShowTemplate = ({
     data: {
         wpcontent:{
             show:{
                 show, 
                 genres:{edges: genres},
                },
            },
        },
     }) => {
    return <Layout>
        <SEO title="Show"/>
        <Wrapper>
            <div className="artist-container">
              <div className="artist-image">
                <Image fluid={show.showBannerPicture.imageFile.childImageSharp.fluid} alt={show.showBannerPicture.altText}/>
                <div className="roles">
                    {genres.map(({node: genres}) => (
                        <div className="role">{genres.name} </div>
                    ) )}
                  </div>
                </div>
                <div className="artist-info">
                  <h2>{show.name}</h2>
                  <br/>
                  <p className="description">
                    {show.description}
                  </p>
                  <p className="info">
                    <strong>Country: </strong>{show.country}
                  </p>
                  <p className="info">
                    <strong>Release Year: </strong>{show.release}
                  </p>

                </div>
            </div>
        </Wrapper>
    </Layout>
}

export default ShowTemplate

export const pageQuery = graphql`
query ($id: ID!) {
  wpcontent {
    show(id: $id, idType: ID) {
      genres {
        edges {
          node {
            name
          }
        }
      }
      show {
        name
        release
        description
        country
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

  

`