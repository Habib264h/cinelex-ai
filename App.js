import React, {useState} from 'react';
import { SafeAreaView, TextInput, Button, Image, Text } from 'react-native';

export default function App(){
  const [token, setToken] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  async function createImage(){
    if(!token){ alert('Please login/signup first (demo)'); return; }
    const res = await fetch('http://localhost:4000/api/generate/image', {
      method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    const jobId = data.jobId;
    const jobRes = await fetch(`http://localhost:4000/api/generate/job/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
    const jobData = await jobRes.json();
    if(jobData.result) setImageUrl(jobData.result.imageUrl);
  }

  return (
    <SafeAreaView style={{padding:20}}>
      <Text>Demo: اكتب وصفاً لإنشاء صورة</Text>
      <TextInput placeholder="اكتب الوصف" value={prompt} onChangeText={setPrompt} style={{borderWidth:1, padding:8, marginVertical:8}} />
      <Button title="إنشاء صورة" onPress={createImage} />
      {imageUrl && <Image source={{uri:imageUrl}} style={{width:300,height:300, marginTop:12}} />}
    </SafeAreaView>
  )
}
