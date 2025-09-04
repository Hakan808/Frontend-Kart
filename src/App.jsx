import { useState,useEffect } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

export default function App() {
  /* Challenge

	Kullanıcı kartın kapağına tıkladığında kart açılır ve kapanır, ancak kart şirketi daha sofistike bir kontrol yöntemi istiyor. Kullanıcının mouse ile parmağını kaydırmasını taklit eden bir yöntem. Göreviniz aşağıdaki gibi bir tane ayarlamaktır:
		
		1. "open" class'ı, 34. satırdaki className'i "cover" olan div'e yalnızca aşağıdaki koşulların tümü karşılandığında uygulanmalıdır: 
		   	
			   - Kullanıcı mouse butonunu "cover" div'inin içinde bir yerde basılı tutuyorsa.
			   
    		   - Mouse butonunu basılı tutmaya devam ederken, imleci basılı tutmaya başladığı yerin 50 piksel soluna hareket ettirir. 
		
		2. Kullanıcı daha sonra mouse'unu "cover" div'i açıkken aşağı doğru hareket ettirirse, "open" 
		   class'ı kaldırılmalı ve böylece kart kapatılmalıdır. 
		   
	Not: cardOpen state'ini, 33. satırdaki onClick olay işleyicisini ve 34. satırdaki "open" class'ının şu anda uygulanma şeklini değiştirmeniz veya düzenlemeniz gerekecektir. 
*/

 const [cardOpen, setCardOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  function handleMouseDown(e) {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY }); 
  }

useEffect(() => {
    function handleMouseMove(e) {
      if (!dragging) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

     
      if (!cardOpen && deltaX <= -50) {
        setCardOpen(true);
        setDragging(false);
      }

     
      if (cardOpen && deltaY >= 50) {
        setCardOpen(false);
        setDragging(false);
      }
    }

    function handleMouseUp() {
      setDragging(false);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, startPos, cardOpen]);

  function handleMouseUp() {
    setDragging(false);
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="card">
        <InnerMessage />

        <div
          className={`cover ${cardOpen ? "open" : ""}`}
          onMouseDown={handleMouseDown}
          
        >
          <FrontMessage />
          <img src="./images/forLoop.png" alt="loop" />
        </div>
      </div>
    </div>
  );
}
