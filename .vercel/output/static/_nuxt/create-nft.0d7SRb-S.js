import{_ as U}from"./nuxt-link.Vb1Fot_j.js";import{u as V,b as P,c as y}from"./entry.GFMhS71B.js";import{u as x}from"./collections.sY5LnFFH.js";import{u as q}from"./index.R6-aFLCX.js";import{a as m,o as A,q as r,A as e,x as w,y as k,u as o,L as D,H as I,P as T,N as c,Z as C,I as B,J as E,O as p,M as F,Q as L,l as i}from"./swiper-vue.5_csNmSw.js";import{a as f}from"./authStates.QCPyDKGd.js";import{e as _,s as $}from"./showAlert.gTKGgNLp.js";import"./vue.f36acd1f.qs0pgTND.js";import"./cookie.T-c3k4Q1.js";const j={class:"mb-7 d-flex align-items-center"},z=e("i",{class:"ki-solid ki-left fs-1"},null,-1),O=e("div",{class:"mx-md-auto ms-5 fs-1 fw-bold"},"Create an NFT",-1),R={class:"row g-3 g-lg-8 justify-content-center"},G={class:"col-12 col-lg-6"},H={class:"card bg-transparent border-0"},J={class:"card-body"},Q=e("div",{class:"fs-6 fw-semibold mb-5"}," Once your item is minted you will not be able to change any of its information. ",-1),Z={class:"d-flex flex-column"},K={class:"fv-row order-1 order-lg-2 mb-5 mb-lg-0"},W=["src"],X=L('<div class="dz-message needsclick position-absolute"><i class="ki-duotone ki-file-up fs-3x text-primary"><span class="path1"></span><span class="path2"></span></i><div class="ms-4"><h3 class="fs-5 fw-bold text-gray-900 mb-1"> click to upload. </h3><span class="fs-7 fw-semibold text-gray-500">Max size: 5mb</span></div></div>',1),Y={class:"border-dashed py-2 order-lg-1 order-2 mb-lg-5 w-100 p-5 rounded border-primary mb-0 d-flex flex-row justify-content-between align-items-center"},ee=e("i",{class:"ki-duotone ki-flash-circle fs-4x text-success me-4"},[e("span",{class:"path1"}),e("span",{class:"path2"})],-1),se={class:"d-flex flex-column"},te=e("span",{class:"fw-bold fs-5 text-primary"},"Minting fee ",-1),oe={class:"fs-2 fw-bold text-end"},le={class:"col-12 col-lg-6"},ae={class:"card card-stretch border-0 card-flush bg-transparent"},ne={class:"card-body"},re={key:0,class:"mb-5 order-lg-1 order-2"},ie=e("label",{for:"",class:"form-label"},"Pick Collection",-1),de=["value"],ce={key:1,class:"mb-5"},ue=e("div",{class:"text-info text-sm fw-semibold"}," Don't own a collection? ",-1),me=e("i",{class:"ki-solid ki-plus-square fs-2 me-2"},null,-1),pe={class:"mb-5"},fe=e("label",{for:"",class:"form-label"},"Name",-1),_e={class:"mb-5 order-lg-1 order-2"},ge=e("label",{for:"",class:"form-label"},"Category",-1),be=e("option",{value:"art"},"Art",-1),he=e("option",{value:"music"},"Music",-1),ve=e("option",{value:"photography"}," Photography ",-1),ye=e("option",{value:"gaming"},"Gaming",-1),xe=[be,he,ve,ye],we={class:"mb-5"},ke=e("label",{for:"",class:"form-label"},"Items available",-1),Ie={class:"mb-5"},Ce=e("label",{for:"",class:"form-label"},"Price",-1),Fe={class:"mb-5"},Ne=e("label",{for:"",class:"form-label"},"Description",-1),Me=["disabled"],Se={key:0},Ue={key:1,class:""},Ve=e("span",{class:"spinner-border spinner-border-sm ms-2"},null,-1),Pe="Mint NFT",Oe={__name:"create-nft",setup(qe){const g=V().public,b=x().userCollections;q({title:`${g.APP} - ${Pe}`});const h=P().settings,v=m(),u=m(),d=m(!1),l=m({name:"",category:"art",supply:1,nftImg:"",collectionId:"",price:"",desc:"",userId:f().data.value.id,ownerId:f().data.value.id}),N=()=>{if(!l.value.nftImg)return _("Image upload error");if(!f().checkBalance(h.value.mintingFee))return _("Insufficient balance! Fund your wallet.");y.request({method:"post",url:`${g.BE_API}/nfts`,data:l.value}).then(n=>{console.log(n.data),x(),f().loadUser(),$("Success!")}).catch(n=>(console.error("Error uploading image:",n),d.value=!1,_("Failed to create nft"),null)).finally(()=>{d.value=!1})},M=()=>{const n=u.value;if(!n)return _("Select an image");const s=new FormData;s.append("file",n),s.append("upload_preset","ml_default"),d.value=!0,y.request({method:"post",url:"https://api.cloudinary.com/v1_1/"+g.CLOUD_NAME+"/image/upload",data:s,headers:{"Content-Type":"multipart/form-data"}}).then(a=>{if(a.data&&a.data.secure_url){const t=a.data.secure_url;return console.log("Image uploaded successfully:",a.data),l.value.nftImg=t,N(),t}else return console.error("Failed to upload image:",a.data),null}).catch(a=>(d.value=!1,console.error("Error uploading image:",a),null))},S=n=>{const s=n.target.files[0];if(!s)return;const a=new FileReader;a.onload=t=>{u.value=t.target.result},a.readAsDataURL(s)};return A(()=>{console.log(b.value)}),(n,s)=>{const a=U;return i(),r("div",null,[e("div",j,[w(a,{to:"/studio/create",class:"btn btn-light btn-icon rounded-circle"},{default:k(()=>[z]),_:1}),O]),e("div",R,[e("div",G,[e("div",H,[e("div",J,[Q,e("div",Z,[e("div",K,[e("div",{onClick:s[1]||(s[1]=t=>o(v).click()),class:"dropzone position-relative w-100 min-h-300px d-flex align-items-center justify-content-center",id:"kt_dropzonejs_nft_single_studio"},[e("input",{ref_key:"inputSelect",ref:v,type:"file",class:"d-none",onChange:s[0]||(s[0]=t=>S(t))},null,544),o(u)?(i(),r("img",{key:0,class:"mh-250px mh-lg-300px mw-300px mw-md-400px mw-xl-450px",src:o(u),alt:"",srcset:""},null,8,W)):D("",!0),X])]),e("div",Y,[ee,e("div",se,[te,e("div",oe,I(o(h).mintingFee),1)])])])])])]),e("div",le,[e("div",ae,[e("div",ne,[e("form",{class:"form",onSubmit:s[8]||(s[8]=T(t=>M(),["prevent"]))},[o(b).length>0?(i(),r("div",re,[ie,c(e("select",{required:"","onUpdate:modelValue":s[2]||(s[2]=t=>o(l).collectionId=t),class:"form-control",name:""},[(i(!0),r(B,null,E(o(b),t=>(i(),r("option",{value:t.id,key:t.id},I(t.name),9,de))),128))],512),[[C,o(l).collectionId]])])):(i(),r("div",ce,[ue,w(a,{to:"/studio/create-collection",class:"border border-2 rounded mt-3 d-flex align-items-center p-3 fw-bold fs-6"},{default:k(()=>[me,F(" Create collection ")]),_:1})])),e("div",pe,[fe,c(e("input",{required:"",placeholder:"Preferred nft name",type:"text",class:"form-control form-control-solid","onUpdate:modelValue":s[3]||(s[3]=t=>o(l).name=t)},null,512),[[p,o(l).name]])]),e("div",_e,[ge,c(e("select",{required:"","onUpdate:modelValue":s[4]||(s[4]=t=>o(l).category=t),class:"form-control",name:""},xe,512),[[C,o(l).category]])]),e("div",we,[ke,c(e("input",{required:"",placeholder:"Supply",type:"number",class:"form-control form-control-solid","onUpdate:modelValue":s[5]||(s[5]=t=>o(l).supply=t)},null,512),[[p,o(l).supply]])]),e("div",Ie,[Ce,c(e("input",{required:"",placeholder:"0.000",type:"text",class:"form-control form-control-solid","onUpdate:modelValue":s[6]||(s[6]=t=>o(l).price=t)},null,512),[[p,o(l).price]])]),e("div",Fe,[Ne,c(e("textarea",{class:"form-control","onUpdate:modelValue":s[7]||(s[7]=t=>o(l).desc=t)},null,512),[[p,o(l).desc]])]),e("div",null,[e("button",{disabled:o(d)||!o(l).collectionId,type:"submit",class:"btn btn-primary w-100"},[o(d)?(i(),r("span",Ue,[F(" Processing... "),Ve])):(i(),r("span",Se,"Create NFT"))],8,Me)])],32)])])])])])}}};export{Oe as default};
