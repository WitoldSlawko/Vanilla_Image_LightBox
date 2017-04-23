document.addEventListener("DOMContentLoaded", function () {

	var vilb_imgs = document.getElementsByTagName('img');
	var vilb_body = document.querySelector('body');
	var vilb_src_imgs = [];
	
	for (var i = 0; i < vilb_imgs.length; i++) {
		vilb_src_imgs.push(vilb_imgs[i].src);
		vilb_imgs[i].style.cursor = "pointer";
	}
	
	for (var i = 0; i < vilb_imgs.length; i++) {
		vilb_imgs[i].addEventListener("click", function () {
			
			var vilb_locking = vilb_src_imgs.indexOf(this.src);
			var vilb_rotation = 0;
			var vilb_rotation_string = 'rotate(0deg)';
			var vilb_scaling = 1;
			var vilb_scaling_string = 'scale(1)';
			
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
			vilb_image.style.transition = 'all 1s ease';
			vilb_image.src = this.src;
			
			// 0th Row
			var vilb_0th_row = document.createElement('div');
			vilb_0th_row.style.display = 'flex';
			vilb_0th_row.style.justifyContent = 'flex-end';
			
			// CLOSE Button
			var vilb_close_button = document.createElement('button');
			vilb_close_button.style.width = '100px';
			vilb_close_button.style.height = '30px';
			vilb_close_button.innerHTML = "Close";
			
			// 1st Row
			var vilb_1st_row = document.createElement('div');
			vilb_1st_row.style.display = 'flex';
			vilb_1st_row.style.justifyContent = 'center';
			
			// Header with VILB title
			var vilb_header_title = document.createElement('h1');
			vilb_header_title.innerHTML = 'VILB : Vanilla Image LightBox';
			
			// 2nd Row
			var vilb_2nd_row = document.createElement('div');
			vilb_2nd_row.style.display = 'flex';
			vilb_2nd_row.style.justifyContent = 'space-around';
			
			// --- tools buttons
			var vilb_rotate_left = document.createElement('button');
			vilb_rotate_left.innerHTML = 'Rotate Left';
			vilb_rotate_left.style.width = '100px';
			vilb_rotate_left.style.height = '30px';
			var vilb_rotate_right = document.createElement('button');
			vilb_rotate_right.innerHTML = 'Rotate Right';
			vilb_rotate_right.style.width = '100px';
			vilb_rotate_right.style.height = '30px';
			var vilb_scale_down = document.createElement('button');
			vilb_scale_down.innerHTML = 'Scale Down';
			vilb_scale_down.style.width = '100px';
			vilb_scale_down.style.height = '30px';
			var vilb_scale_up = document.createElement('button');
			vilb_scale_up.innerHTML = 'Scale Up';
			vilb_scale_up.style.width = '100px';
			vilb_scale_up.style.height = '30px';
			
			// 3rd Row
			var vilb_3rd_row = document.createElement('div');
			vilb_3rd_row.style.display = 'flex';
			vilb_3rd_row.style.justifyContent = 'center';
			
			// Image source path
			var vilb_src_path = document.createElement('p');
			vilb_src_path.style.alignSelf = 'center';
			vilb_src_path.innerHTML = this.src;
			
			// Center Row
			var vilb_center_row = document.createElement('div');
			vilb_center_row.style.display = 'flex';
			vilb_center_row.style.justifyContent = 'center';
			vilb_center_row.style.alignItems = 'center';
			vilb_center_row.style.border = '3px solid black';
			vilb_center_row.style.overflow = 'scroll';
			vilb_center_row.style.height = '80%';
			
			// 4th Row
			var vilb_4th_row = document.createElement('div');
			vilb_4th_row.style.display = 'flex';
			vilb_4th_row.style.justifyContent = 'center';
			
			// PREVIOUS Button
			var vilb_previous_button = document.createElement('button');
			vilb_previous_button.innerHTML = "Previous";
			vilb_previous_button.style.width = "100px";
			
			// Steps viewer
			var vilb_steps_viewer = document.createElement('p');
			vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + vilb_imgs.length;
			
			// NEXT Button
			var vilb_next_button = document.createElement('button');
			vilb_next_button.innerHTML = "Next";
			vilb_next_button.style.width = "100px";
			
			
			// Appending created elements
			vilb_0th_row.appendChild(vilb_close_button);
			vilb_full_screen.appendChild(vilb_0th_row);
			
			vilb_1st_row.appendChild(vilb_header_title);
			vilb_full_screen.appendChild(vilb_1st_row);
			
			vilb_2nd_row.append(vilb_rotate_left);
			vilb_2nd_row.append(vilb_rotate_right);
			vilb_2nd_row.append(vilb_scale_down);
			vilb_2nd_row.append(vilb_scale_up);
			vilb_full_screen.appendChild(vilb_2nd_row);
			
			vilb_3rd_row.appendChild(vilb_src_path);
			vilb_full_screen.appendChild(vilb_3rd_row);
			
			vilb_center_row.appendChild(vilb_image);
			vilb_full_screen.appendChild(vilb_center_row);
			
			vilb_4th_row.appendChild(vilb_previous_button);
			vilb_4th_row.appendChild(vilb_steps_viewer);
			vilb_4th_row.appendChild(vilb_next_button);
			
			vilb_full_screen.appendChild(vilb_4th_row);
			
			
			// Final appendition
			vilb_body.appendChild(vilb_full_screen);
			
			// Closing event
			vilb_close_button.addEventListener("click", function () {
				vilb_body.removeChild(vilb_full_screen);
			});
			
			// Rotating image over LEFT 
			vilb_rotate_left.addEventListener("click",function(){
				vilb_rotation -= 90;
				vilb_rotation_string = 'rotate('+vilb_rotation+'deg)';
				vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
				return vilb_rotation, vilb_scaling, vilb_rotation_string, vilb_scaling_string;
			})
			
			// Rotating image over RIGHT 
			vilb_rotate_right.addEventListener("click",function(){
				vilb_rotation += 90;
				vilb_rotation_string = 'rotate('+vilb_rotation+'deg)';
				vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
				return vilb_rotation, vilb_scaling, vilb_rotation_string, vilb_scaling_string;
			})
			
			// Scaling down
			vilb_scale_down.addEventListener("click",function(){
				vilb_scaling -= 0.1;
				vilb_scaling_string = 'scale('+vilb_scaling+')';
				vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
				return vilb_scaling, vilb_rotation, vilb_rotation_string, vilb_scaling_string;
			})
			
			// Scaling up
			vilb_scale_up.addEventListener("click",function(){
				vilb_scaling += 0.1;
				vilb_scaling_string = 'scale('+vilb_scaling+')';
				vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
				return vilb_scaling, vilb_rotation, vilb_rotation_string, vilb_scaling_string;
			})
			
			// Sliding images to the LEFT <---
			vilb_previous_button.addEventListener("click", function () {
				if (vilb_locking > 0 && vilb_locking <= vilb_imgs.length - 2) {
					vilb_rotation = 0;
					vilb_rotation_string = 'rotate('+vilb_rotation+'deg)';
					vilb_scaling = 1;
					vilb_scaling_string = 'scale('+vilb_scaling+')';
					vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
					vilb_locking -= 1;
					vilb_src_path.innerHTML = vilb_imgs[vilb_locking].src;
					vilb_image.src = vilb_imgs[vilb_locking].src;
					vilb_image.style.width = vilb_imgs[vilb_locking].offsetWidth + 'px';
					vilb_image.style.height = vilb_imgs[vilb_locking].offsetHeight + 'px';
					vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + (vilb_imgs.length-1);
					return vilb_locking, vilb_rotation, vilb_scaling, vilb_rotation_string, vilb_scaling_string;
				}
			})

			// Sliding images to the RIGHT --->
			vilb_next_button.addEventListener("click", function () {
				if (vilb_locking >= 0 && vilb_locking < vilb_imgs.length - 2) {
					vilb_rotation = 0;
					vilb_rotation_string = 'rotate('+vilb_rotation+'deg)';
					vilb_scaling = 1;
					vilb_scaling_string = 'scale('+vilb_scaling+')';
					vilb_image.style.transform = vilb_rotation_string+' '+vilb_scaling_string;
					vilb_locking += 1;
					vilb_src_path.innerHTML = vilb_imgs[vilb_locking].src;
					vilb_image.src = vilb_imgs[vilb_locking].src;
					vilb_image.style.width = vilb_imgs[vilb_locking].offsetWidth + 'px';
					vilb_image.style.height = vilb_imgs[vilb_locking].offsetHeight + 'px';
					vilb_steps_viewer.innerText = 'Image ' + (vilb_locking+1) + ' from ' + (vilb_imgs.length-1);
					return vilb_locking, vilb_rotation, vilb_scaling, vilb_rotation_string, vilb_scaling_string;
				}
			})
		})
	}

});
