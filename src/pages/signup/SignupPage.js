import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

import './SignupPage.css'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const {signup, isPending, error } = useSignup()
    
    const handleSubmit = (e) => {
      e.preventDefault()
      signup(email, password, displayName, thumbnail)
    }
  
    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0];
        if(!selected){
            setThumbnailError(`Please select a photo`)
            return
        }
        if(!selected.type.includes(`image`)){
            setThumbnailError(`Selected file must be an image`)
            return
        }
        if(selected.size > 1000000){
            setThumbnailError(`Image file size must be less than 10000kb`)
            return
        }
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
      
    }
  
    return (
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>sign up</h2>
        <label>
          <span>email:</span>
          <input
            required 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
        </label>
        <label>
          <span>display name:</span>
          <input
            required
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)} 
            value={displayName}
          />
        </label>
        <label>
          <span>Profile thumbnail:</span>
          <input 
            required
            type="file"
            onChange={handleFileChange}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {isPending && <button className="btn" disabled>Loading...</button>}
        {!isPending && <button className="btn">Sign up</button>}
        {error && <p className="error">{error}</p>}
      </form>
    );
}
 
export default SignupPage;