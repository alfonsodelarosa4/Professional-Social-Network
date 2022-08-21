import styled from "styled-components";
import {useState} from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
    // variables in component and functions to modify them
    const [editorText, setEditorText] = useState("");

    const [shareImage, setShareImage] = useState("");

    const [videoLink, setVideoLink] = useState("");

    const [assetArea, setAssetArea] = useState("");

    // double checks if it's an image
    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === '' || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }

        setShareImage(image);

    };

    // switching between adding picture or video
    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    // allows you to post an article
    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            console.log("hello");
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        reset(e);
    };

    // clears the fields in the share box
    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    return (
    <>
        { props.showModal === "open" &&
            (<Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        
                            <AssetButton onClick={(event) => reset(event)}> 
                                Close
                            </AssetButton>
                        
                    </Header> 
                    
                    <SharedContent>
                        <UserInfo>
                                {props.user.photoURL ? ( <img src={props.user.photoURL} /> 
                                ) : (
                                    <img src="/images/user.svg" alt="" />
                                )}
                            <span>{props.user.displayName}</span>
                        </UserInfo>
                        <Editor>
                            <textarea 
                                value= { editorText } 
                                onChange = {(e) => setEditorText(e.target.value) }
                                placeholder = "What do you want to talk about?"
                                autoFocus = {true}
                            />
                            {}
                        </Editor>

                        { assetArea === "image" ? (
                        <UploadImage>
                            <input 
                                type="file" accept="images/gif, iamge/jpeg, image/png"
                                name="image" id="file" style={{ display:"none" }}
                                onChange={handleChange}
                                />
                            <AssetButton>
<label htmlFor="file">Click here to upload image</label>
                            </AssetButton>
                                
                            
                            {shareImage && ( <img src= {URL.createObjectURL(shareImage)  } /> )}
                            </UploadImage>
                        ) : (
                            assetArea === "media" && (
                            <ShareLink>
                                <input type="text" placeholder="Please input a video link"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                />
                                
                                {videoLink && (
                                    <ReactPlayer width={'100%'} url={videoLink} />
                                )}
                            </ShareLink>
                        )
                        )
                        }
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton onClick={() => switchAssetArea('image') }>
                                Image
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea("media") }>
                                Video
                            </AssetButton>
                        </AttachAssets>

                        <div>
                        <PostButton  disabled={!editorText ? true: false} 
                        onClick={(event) => postArticle(event)}>
                            Post
                        </PostButton>
                        </div>
                    </ShareCreation>
                </Content>
            </Container>)
        }
    </>
    )
};

const Container = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    z-index: 999;
    color: black;
    background-color: rgba(0,0,0, 0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div `
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div `
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const SharedContent = styled.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 0px 10px;

`;

const UserInfo = styled.div `
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,
    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 0px 24px 12px 24px;
`;



const AssetButton = styled.button `
    /* display: flex; */
    /* align-items: center; */
    /* height: 35px; */

    /* min-width: 60px; */
    width: auto;

    display:inline-block;
    padding: 8px 20px;
    border: none;
    border-radius: 5px;


    font-weight: bold;

    background-color: rgba(61, 159, 247, 1);
    color: white;
    &:hover {
        color: rgba(61, 159, 247, 1);
        background-color: white ;
    }
`;

const AttachAssets = styled.div `
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    /* padding-right: 8px; */
    ${AssetButton} {
        /* width: 40px; */
    }
`;

const ShareComment = styled.div `
    padding-left: 8px;
    margin-left: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton} {
        svg {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button `
padding: 8px 20px;
    font-size: 16px;
    border: none;
    background-color: rgba(61, 159, 247, 1);
    color: white;
    &:hover {
        color: rgba(61, 159, 247, 1);
        background-color: white ;
    }
    border-radius: 5px;

font-weight: bold;
`;

const Editor = styled.div `
    padding: 6px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        border-radius: 7px;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        /* margin-bottom: 20px; */
    }
`;

const UploadImage = styled.div`
    text-align: center;
    margin: 10px 0px;
    img {
        width: 100%;
    }
`;

const ShareLink = styled.div`
margin: 10px auto;
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
