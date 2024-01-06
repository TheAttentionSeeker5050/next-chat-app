import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faFacebook, faGithub, faGoogle, faMicrosoft, faTwitter } from "@fortawesome/free-brands-svg-icons";

const LoginWithOauthForm = () => {
    return (
        <form className='flex flex-col gap-4 dark:text-fore-secondary-dark' >
            <h2 className='text-xl font-semibold text-center text-blue-balloons-secondary-light'>Oauth Login (To Be Implemented)</h2>
            <p className="text-center">Choose your login provider:</p>

            <div id="oauth-providers-wrapper" className="flex flex-row flex-wrap justify-center gap-3 text-dark-blue-fore-light">
                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faGithub} />
                    <span>GitHub</span>
                </button>
                
                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faGoogle} />
                    <span>Google</span>
                </button>

                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faTwitter} />
                    <span>Twitter</span>
                </button>
                
                {/* facebook */}
                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faFacebook} />
                    <span>Facebook</span>
                </button>
                {/* login with microsoft account */}
                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faMicrosoft} />
                    <span>Microsoft</span>
                </button>
                {/* login with apple account */}
                <button className="flex gap-2 items-center border-2 border-blue-balloons-light hover:border-dark-blue-fore-light px-2 py-1 rounded-lg bg-back-secondary-light hover:bg-fore-secondary-light">
                    <FontAwesomeIcon icon={faApple} />
                    <span>Apple</span>
                </button>
            </div>

        </form>
    )
};



export default LoginWithOauthForm;