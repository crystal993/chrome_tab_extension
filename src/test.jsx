import React, { useState, useEffect } from "react";

function Popup() {
  const [currentTabId, setCurrentTabId] = useState(null);
  const [nextTabId, setNextTabId] = useState(null);
  const [groupTabId, setGroupTabId] = useState([]);

  useEffect(() => {
    // 다음 탭 ID 가져오기
    // { active: false }
    // chrome.tabs.query({}, function (tabs) {
    //   var nextTab = tabs[1];
    //   // var nextTab = tabs[0];
    //   if (nextTab) {
    //     setNextTabId(nextTab.id);
    //   }
    //   setGroupTabId(tabs);
    //   // chrome.tabs.update(nextTab, { active: true });
    // });
    // 이전 탭 id 가져오기
    // 현재 탭 id 가져오기
    // getCurrentTab();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        setCurrentTabId(currentTab.id);
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        setCurrentTabId(currentTab.id);
      }
      chrome.tabs.query({}, function (tabs) {
        var nextTab = tabs[1];
        // var nextTab = tabs[0];
        if (nextTab) {
          setNextTabId(nextTab.id);
        }
        setGroupTabId(tabs);
        chrome.tabs.update(nextTab, { active: true });
      });
    });
  }, []);

  const getCurrentTab = () => {
    // 현재 탭 id 가져오기
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        setCurrentTabId(currentTab.id);
      }
    });
  };

  const switchTab = (tabId) => {
    // 탭 전환
    chrome.tabs.update(tabId, { active: true });
  };

  const sendMessageToActiveTab = async (message) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = chrome.tabs.sendMessage(tab.id, message);
    // TODO: Do something with the response.
  };

  return (
    <div>
      <p>현재 탭 ID: {currentTabId}</p>
      <p>다음 탭 ID: {nextTabId}</p>
      <p>
        전체 탭 id
        {groupTabId.map((tab, index) => {
          return (
            <>
              탭{index} : {tab.id}
            </>
          );
        })}
      </p>
      <button onClick={() => switchTab(nextTabId)}>다음 탭으로 전환</button>
      {/* <button onClick={() => chrome.tabs.goBack()}>이전 탭으로 전환</button>
      <button onClick={() => chrome.tabs.goForward()}>다음 탭으로 전환</button> */}
    </div>
  );
}

export default Popup;
