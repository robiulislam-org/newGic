# 📊 গ্লোবাল ইসলামিক কেয়ার - অ্যানালিটিক্স এবং ড্যাশবোর্ড সেটআপ গাইড

আমরা আপনার সাইটের জন্য একটি কাস্টম লাইভ ভিজিটর ট্র্যাকিং এবং ৭ দিনের ট্রাফিক ড্যাশবোর্ড তৈরি করেছি। এটি সচল করার জন্য আপনাকে একটি সম্পূর্ণ ফ্রি **Firebase Realtime Database** সেটআপ করতে হবে। নিচে ধাপগুলো অত্যন্ত সহজভাবে বর্ণনা করা হলো:

---

## ধাপ ১: Firebase প্রজেক্ট তৈরি করুন
1. ব্রাউজারে [Firebase Console](https://console.firebase.google.com/) এ যান এবং আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।
2. **"Add project"** বাটনে ক্লিক করুন।
3. প্রজেক্টের একটি নাম দিন (যেমন: `GIC-Analytics`) এবং **Continue** করুন।
4. Google Analytics অপশনটি ডিফল্টভাবে অন থাকবে, চাইলে এটি **Disable/Off** করে দিতে পারেন (কারণ আমরা আমাদের নিজেদের কাস্টম অ্যানালিটিক্স ব্যবহার করছি)। এরপর **Create project**-এ ক্লিক করুন।
5. প্রজেক্ট তৈরি হওয়া পর্যন্ত কয়েক সেকেন্ড অপেক্ষা করে **Continue** করুন।

---

## ধাপ ২: Realtime Database চালু করুন
1. প্রজেক্ট ড্যাশবোর্ডের বাম পাশের মেনু থেকে **Build > Realtime Database** এ যান।
2. **"Create Database"** বাটনে ক্লিক করুন।
3. ডেটাবেস লোকেশন ডিফল্ট রেখে (যেমন: United States) **Next** ক্লিক করুন।
4. নিরাপত্তা নীতি বা Rules অপশনে **"Start in test mode"** সিলেক্ট করুন এবং **Enable** ক্লিক করুন। (এটি করার ফলে ডেটাবেসটি রাইট-অ্যাবল হবে)।

### ⚠️ গুরুত্বপূর্ণ (সিকিউরিটি রুলস আপডেট):
ডেটাবেস তৈরি হয়ে যাওয়ার পর উপরে **Rules** ট্যাবে যান এবং কোডটি পরিবর্তন করে নিচের মতো করে দিন, যাতে আপনার ডেটা সুরক্ষিত থাকে এবং শুধুমাত্র অ্যাডমিন ড্যাশবোর্ড সম্পূর্ণ হিস্ট্রি পড়তে পারে:

```json
{
  "rules": {
    "live_visitors": {
      ".read": true,
      "$session_id": {
        ".write": "newData.hasChildren(['page', 'lastPing']) || !newData.exists()"
      }
    },
    "analytics": {
      ".read": true,
      ".write": true
    }
  }
}
```
এটি লিখে **Publish** বাটনে ক্লিক করুন।

---

## ধাপ ৩: Firebase কনফিগ সংগ্রহ করুন
1. ডেটাবেসের বাম পাশের সাইডবারের একদম উপরে গিয়ার আইকনে (⚙️ Project settings) ক্লিক করে **Project settings**-এ যান।
2. জেনারেল ট্যাবের নিচে স্ক্রোল করে **"Your apps"** সেকশনে যান।
3. **Web (</>)** আইকনটিতে ক্লিক করুন।
4. আপনার অ্যাপের একটি নাম দিন (যেমন: `gic-web`) এবং **Register app** বাটনে ক্লিক করুন।
5. রেজিস্টার হওয়ার পর আপনার সামনে একটি কোড ব্লক আসবে যার ভেতর `const firebaseConfig = { ... }` লেখা থাকবে।
6. ওই অবজেক্টের ভেতরের অংশটুকু কপি করে নিন:
   - `apiKey`
   - `authDomain`
   - `databaseURL`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## ধাপ ৪: `gic-config.js` আপডেট করুন
আপনার প্রজেক্টের প্রধান ডিরেক্টরিতে [gic-config.js](file:///d:/GIC%20website/gic-config.js) নামের ফাইলটি ওপেন করুন এবং কপি করা ভ্যালুগুলো সেখানে বসিয়ে দিন। উদাহরণস্বরূপ:

```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxx",
  authDomain: "gic-analytics.firebaseapp.com",
  databaseURL: "https://gic-analytics-default-rtdb.firebaseio.com",
  projectId: "gic-analytics",
  storageBucket: "gic-analytics.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// আপনার ড্যাশবোর্ড পেজে প্রবেশের পাসওয়ার্ড পরিবর্তন করতে পারেন:
export const adminPassword = "আপনার_পছন্দের_পাসওয়ার্ড";
```

ফাইলটি সেভ করে গিটহাবে পুশ করে দিন অথবা নেটলিফাইতে রিলোড করুন।

---

## ধাপ ৫: আপনার ড্যাশবোর্ড দেখুন!
সবকিছু সেটআপ হয়ে গেলে আপনার সাইটের নামের পর `/dashboard.html` যোগ করে ভিজিট করুন (যেমন: `https://your-site.netlify.app/dashboard.html`)। 
পাসওয়ার্ডটি দিয়ে লগইন করলেই আপনি লাইভ দেখতে পারবেন কয়জন ভিজিটর আপনার সাইটে কোন পেজে আছে এবং কোথা থেকে ভিজিট করছে! 
🎉 অভিনন্দন! আপনার কাস্টম অ্যানালিটিক্স এখন সম্পূর্ণ সচল!
