document.addEventListener("DOMContentLoaded", function () {

	var vilb_imgs = document.getElementsByTagName('img');
	var vilb_body = document.querySelector('body');
	var vilb_src_imgs = [];
	
	for (var i = 0; i < vilb_imgs.length; i++) {
		vilb_src_imgs.push(vilb_imgs[i].src);
		vilb_imgs[i].style.cursor = "pointer";
	}
	
	for (var i = 0; i < vilb_imgs.length; i++) {
		vilb_imgs[i].addEventListener("click", function (press1) {
			
			var vilb_locking = vilb_src_imgs.indexOf(this.src);
			
			// Main DIV
			var vilb_full_screen = document.createElement('div');
			vilb_full_screen.style.display = 'flex';
			vilb_full_screen.style.flexDirection = 'column';
			vilb_full_screen.style.position = 'fixed';
			vilb_full_screen.style.width = '100%';
			vilb_full_screen.style.height = '100%';
			vilb_full_screen.style.left = '0';
			vilb_full_screen.style.top = '0';
			vilb_full_screen.style.zIndex = '1';
			vilb_full_screen.style.background = 'rgba(255,255,255,0.7)'
			
			// Main IMAGE
			var vilb_image = document.createElement('img');
			vilb_image.style.display = 'flex';
			vilb_image.style.margin = '10px auto';
			vilb_image.style.width = this.offsetWidth + 'px';
			vilb_image.style.height = this.offsetHeight + 'px';
			vilb_image.src = this.src;
			
			// 1st Row
			var vilb_1st_row = document.createElement('div');
			vilb_1st_row.style.display = 'flex';
			vilb_1st_row.style.justifyContent = 'flex-end';
			
			// CLOSE Button
			var vilb_close_button = document.createElement('button');
			vilb_close_button.style.width = '100px';
			vilb_close_button.innerHTML = "Close";
			
			// 2nd Row
			var vilb_2nd_row = document.createElement('div');
			vilb_2nd_row.style.display = 'flex';
			vilb_2nd_row.style.justifyContent = 'center';
			
			// --- tools buttons
			
			// 3rd Row
			var vilb_3rd_row = document.createElement('div');
			vilb_3rd_row.style.display = 'flex';
			vilb_3rd_row.style.justifyContent = 'center';
			
			// Image source path
			var vilb_src_path = document.createElement('p');
			vilb_src_path.style.alignSelf = 'center';
			vilb_src_path.innerHTML = this.src;
			
			// 4th Row
			var vilb_4th_row = document.createElement('div');
			vilb_4th_row.style.display = 'flex';
			vilb_4th_row.style.justifyContent = 'center';
			
			// PREVIOUS Button
			var vilb_previous_button = document.createElement('button');
			vilb_previous_button.innerHTML = "previous";
			vilb_previous_button.style.width = "100px";
			
			// Steps viewer
			var vilb_steps_viewer = document.createElement('p');
			vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + vilb_imgs.length;
			
			// NEXT Button
			var vilb_next_button = document.createElement('button');
			vilb_next_button.innerHTML = "next";
			vilb_next_button.style.width = "100px";
			
			
			// Appending created elements
			vilb_1st_row.appendChild(vilb_close_button);
			vilb_full_screen.appendChild(vilb_1st_row);
			
			vilb_3rd_row.appendChild(vilb_src_path);
			vilb_full_screen.appendChild(vilb_3rd_row);
			
			vilb_full_screen.appendChild(vilb_image);
			
			vilb_4th_row.appendChild(vilb_previous_button);
			vilb_4th_row.appendChild(vilb_steps_viewer);
			vilb_4th_row.appendChild(vilb_next_button);
			
			vilb_full_screen.appendChild(vilb_4th_row);
			
			
			// Final appendition
			vilb_body.appendChild(vilb_full_screen);
			
			// Closing event
			vilb_close_button.addEventListener("click", function (press2) {
				vilb_body.removeChild(vilb_full_screen);
			})
			
			// Sliding images to the LEFT <---
			vilb_previous_button.addEventListener("click", function (press3) {
				if (vilb_locking > 0 && vilb_locking <= vilb_imgs.length - 2) {
					vilb_locking -= 1;
					vilb_src_path.innerHTML = vilb_imgs[vilb_locking].src;
					vilb_image.src = vilb_imgs[vilb_locking].src;
					vilb_image.style.width = vilb_imgs[vilb_locking].offsetWidth + 'px';
					vilb_image.style.height = vilb_imgs[vilb_locking].offsetHeight + 'px';
					vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + (vilb_imgs.length-1);
					return vilb_locking;
				}
			})

			// Sliding images to the RIGHT --->
			vilb_next_button.addEventListener("click", function (press4) {
				if (vilb_locking >= 0 && vilb_locking < vilb_imgs.length - 2) {
					vilb_locking += 1;
					vilb_src_path.innerHTML = vilb_imgs[vilb_locking].src;
					vilb_image.src = vilb_imgs[vilb_locking].src;
					vilb_image.style.width = vilb_imgs[vilb_locking].offsetWidth + 'px';
					vilb_image.style.height = vilb_imgs[vilb_locking].offsetHeight + 'px';
					vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + (vilb_imgs.length-1);
					return vilb_locking;
				}
			})
		})
	}

});
