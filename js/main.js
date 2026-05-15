document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    audio.volume = 0.6;
    const mainPlayBtn = document.querySelector('.play-circle');
    const mainPlayIcon = mainPlayBtn?.querySelector('i');
    const currentTimeEl = document.querySelector('.playback-bar .time:first-child');
    const totalTimeEl = document.querySelector('.playback-bar .time:last-child');
    const progressBar = document.querySelector('.progress-bg');
    const progressFill = document.querySelector('.progress-current');
    const volumeBar = document.querySelector('.volume-bg');
    const volumeFill = document.querySelector('.volume-current');
    const muteBtn = document.querySelector('.extra-controls .fa-volume-high');
    const trackItems = document.querySelectorAll('.pro-track-item');
    const trackListContainer = document.querySelector('.pro-track-list');
    const uploadBtn = document.querySelector('.btn-upload');
    const uploadInput = document.getElementById('uploadAudioInput');
    const playAllBtn = document.querySelector('.btn-playall');
    const heartIcons = document.querySelectorAll('.track-actions .fa-heart');
    const playlistItemsContainer = document.querySelector('.playlist-items');
    let playlistSidebarItems = document.querySelectorAll('.pl-item');
    let currentPlayingItem = null;
    let lastVolume = '60%';
    let isDraggingProgress = false;
    let isDraggingVolume = false;
    if (volumeFill) volumeFill.style.width = '60%';

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.library-tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active-content'));
            btn.classList.add('active');
            const target = document.getElementById(btn.getAttribute('data-target'));
            if (target) target.classList.add('active-content');
        });
    });

    function bindTrackItem(item) {
        item.addEventListener('click', function() {
            console.log('Track clicked! Element:', this);
            currentPlayingItem = this;

            const allTracks = document.querySelectorAll('.pro-track-item');
            allTracks.forEach(el => {
                el.classList.remove('active-playing');
                const icon = el.querySelector('.thumb-overlay i');
                if (icon) icon.className = 'fa-solid fa-play';
            });

            this.classList.add('active-playing');
            const activeIcon = this.querySelector('.thumb-overlay i');
            if (activeIcon) activeIcon.className = 'fa-solid fa-pause';

            const src = this.getAttribute('data-src') || this.getAttribute('src');
            console.log('Audio src:', src);
            if (src) {
                console.log('Setting audio src and playing...');
                audio.src = encodeURI(src.trim());
                audio.play().catch((error) => {
                    console.log('Audio play failed:', error);
                    if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
                });
                if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-pause';
                console.log('Audio setup complete');

                const title = this.getAttribute('data-title');
                const artist = this.getAttribute('data-artist');
                const thumb = this.getAttribute('data-thumb');
                updateNowPlaying(title, artist, thumb);
                addOrHighlightSidebarEntry(this);
            }
        });

        const heart = item.querySelector('.track-actions .fa-heart');
        if (heart) {
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                heart.classList.toggle('fa-solid');
                heart.classList.toggle('fa-regular');
                heart.classList.toggle('liked');
            });
        }
    }

    function updateNowPlaying(title, artist, thumb) {
        console.log('Update now-playing:', { title, artist, thumb });
        const titleEl = document.querySelector('.playing-info h4');
        const artistEl = document.querySelector('.playing-info p');
        const thumbImg = document.querySelector('.now-playing img');

        // Footer small player
        if (titleEl) titleEl.textContent = title || 'No Title';
        if (artistEl) artistEl.textContent = artist || 'No Artist';
        if (thumbImg && thumb) {
            thumbImg.src = thumb;
            thumbImg.style.display = 'block';
            thumbImg.style.width = '50px';
            thumbImg.style.height = '50px';
            thumbImg.style.objectFit = 'cover';
        }

        // Big now-playing card in main content
        const bigDisplay = document.querySelector('.now-playing-display');
        const bigThumb = document.querySelector('.now-playing-thumb');
        const bigTitle = document.querySelector('.now-playing-title');
        const bigArtist = document.querySelector('.now-playing-artist');
        const bigCurrent = document.querySelector('.now-playing-current');
        const bigDuration = document.querySelector('.now-playing-duration');

        if (bigDisplay) {
            bigDisplay.style.display = 'block';
            bigDisplay.setAttribute('aria-hidden', 'false');
        }
        if (bigThumb && thumb) {
            bigThumb.src = thumb;
        }
        if (bigTitle) bigTitle.textContent = title || 'No Title';
        if (bigArtist) bigArtist.textContent = artist || 'No Artist';

        // If audio already has metadata, set duration on big display
        if (audio.duration && bigDuration) {
            bigDuration.textContent = formatTime(audio.duration);
        }
        if (bigCurrent) bigCurrent.textContent = formatTime(audio.currentTime || 0);
    }

    function createTrackItem({ src, title, artist, thumb }) {
        const item = document.createElement('div');
        item.className = 'pro-track-item';
        item.setAttribute('data-src', src);
        item.setAttribute('data-title', title);
        item.setAttribute('data-artist', artist);
        item.setAttribute('data-thumb', thumb);
        item.innerHTML = `
            <div class="track-thumb">
                <img src="${thumb}" alt="Song Cover">
                <div class="thumb-overlay"><i class="fa-solid fa-play"></i></div>
            </div>
            <div class="track-body">
                <h4>${title}</h4>
                <p>${artist}</p>
            </div>
            <div class="track-actions">
                <i class="fa-regular fa-heart"></i>
            </div>
        `;
        return item;
    }

    // Create a sidebar playlist item element
    function createSidebarItem({ src, title, artist, thumb }) {
        const el = document.createElement('div');
        el.className = 'pl-item';
        el.setAttribute('data-src', src);
        el.innerHTML = `
            <div class="pl-icon"><i class="fa-solid fa-music"></i></div>
            <div class="pl-info">
                <p>${title}</p><span>${artist}</span>
            </div>
        `;

        // click on sidebar item -> play that track
        el.addEventListener('click', function() {
            // remove active from other sidebar items
            document.querySelectorAll('.pl-item').forEach(i => {
                i.classList.remove('active-playing');
                const icon = i.querySelector('.pl-icon i');
                if (icon) icon.className = 'fa-solid fa-music';
            });
            this.classList.add('active-playing');
            const icon = this.querySelector('.pl-icon i');
            if (icon) icon.className = 'fa-solid fa-chart-simple';

            const srcAttr = this.getAttribute('data-src');
            // try to find existing track in main list
            const corresponding = Array.from(document.querySelectorAll('.pro-track-item')).find(t => (t.getAttribute('data-src') || '').trim() === (srcAttr || '').trim());
            if (corresponding) {
                corresponding.click();
            } else if (srcAttr) {
                audio.src = encodeURI(srcAttr.trim());
                audio.play().catch(() => {});
                // update now playing UI
                updateNowPlaying(title, artist, thumb);
            }
        });

        return el;
    }

    // Add or highlight a sidebar playlist entry for a track element
    function addOrHighlightSidebarEntry(trackEl) {
        if (!playlistItemsContainer || !trackEl) return;
        const src = (trackEl.getAttribute('data-src') || '').trim();
        const title = trackEl.getAttribute('data-title') || trackEl.querySelector('h4')?.textContent || 'Unknown';
        const artist = trackEl.getAttribute('data-artist') || trackEl.querySelector('p')?.textContent || '';
        const thumb = trackEl.getAttribute('data-thumb') || '';

        // search existing
        const existing = Array.from(document.querySelectorAll('.pl-item')).find(p => (p.getAttribute('data-src') || '').trim() === src);
        if (existing) {
            // highlight it
            document.querySelectorAll('.pl-item').forEach(i => i.classList.remove('active-playing'));
            existing.classList.add('active-playing');
            const icon = existing.querySelector('.pl-icon i');
            if (icon) icon.className = 'fa-solid fa-chart-simple';
            return existing;
        }

        // create new sidebar item and prepend
        const newPl = createSidebarItem({ src, title, artist, thumb });
        playlistItemsContainer.insertBefore(newPl, playlistItemsContainer.firstChild);
        // update cached NodeList
        playlistSidebarItems = document.querySelectorAll('.pl-item');
        // highlight new item
        document.querySelectorAll('.pl-item').forEach(i => i.classList.remove('active-playing'));
        newPl.classList.add('active-playing');
        const icon = newPl.querySelector('.pl-icon i');
        if (icon) icon.className = 'fa-solid fa-chart-simple';
        return newPl;
    }

    trackItems.forEach(bindTrackItem);

    if (uploadBtn && uploadInput && trackListContainer) {
        uploadBtn.addEventListener('click', () => uploadInput.click());

        uploadInput.addEventListener('change', () => {
            const files = Array.from(uploadInput.files || []);
            files.forEach(file => {
                const fileUrl = URL.createObjectURL(file);
                const title = file.name.replace(/\.[^/.]+$/, '');
                const artist = 'Local file';
                const thumb = 'assets/img/songs/icon-playing.gif';
                const newTrack = createTrackItem({ src: fileUrl, title, artist, thumb });
                trackListContainer.appendChild(newTrack);
                bindTrackItem(newTrack);
                newTrack.click();
            });
            uploadInput.value = '';
        });
    }

    if(playAllBtn) {
        playAllBtn.addEventListener('click', () => {
            const allTracks = document.querySelectorAll('.pro-track-item');
            if (allTracks.length > 0) allTracks[0].click();
        });
    }

    // bind existing sidebar items to play when clicked
    playlistSidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.pl-item').forEach(i => {
                i.classList.remove('active-playing');
                const icon = i.querySelector('.pl-icon i');
                if (icon) icon.className = 'fa-solid fa-music';
            });
            this.classList.add('active-playing');
            const activeIcon = this.querySelector('.pl-icon i');
            if (activeIcon) activeIcon.className = 'fa-solid fa-chart-simple';

            const srcAttr = this.getAttribute('data-src');
            const title = this.querySelector('.pl-info p')?.textContent || '';
            const artist = this.querySelector('.pl-info span')?.textContent || '';
            const corresponding = Array.from(document.querySelectorAll('.pro-track-item')).find(t => (t.getAttribute('data-src') || '').trim() === (srcAttr || '').trim());
            if (corresponding) corresponding.click();
            else if (srcAttr) {
                audio.src = encodeURI(srcAttr.trim());
                audio.play().catch(() => {});
                updateNowPlaying(title, artist, '');
            }
        });
    });

    audio.addEventListener('play', () => {
        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-pause';
        if (currentPlayingItem) {
            const listIcon = currentPlayingItem.querySelector('.thumb-overlay i');
            if (listIcon) listIcon.className = 'fa-solid fa-pause';
        }
        const activePl = document.querySelector('.pl-item.active-playing');
        if (activePl) {
            const icon = activePl.querySelector('.pl-icon i');
            if (icon) icon.className = 'fa-solid fa-chart-simple';
        }
    });

    audio.addEventListener('pause', () => {
        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
        if (currentPlayingItem) {
            const listIcon = currentPlayingItem.querySelector('.thumb-overlay i');
            if (listIcon) listIcon.className = 'fa-solid fa-play';
        }
        const activePl = document.querySelector('.pl-item.active-playing');
        if (activePl) {
            const icon = activePl.querySelector('.pl-icon i');
            if (icon) icon.className = 'fa-solid fa-music';
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
        const bigDuration = document.querySelector('.now-playing-duration');
        if (bigDuration) bigDuration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        if (!isDraggingProgress) {
            if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
            if (audio.duration && progressFill) {
                progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
            }
            const bigCurrent = document.querySelector('.now-playing-current');
            if (bigCurrent) bigCurrent.textContent = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('ended', () => {
        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = "0:00";
        if (currentPlayingItem) {
            const listIcon = currentPlayingItem.querySelector('.thumb-overlay i');
            if (listIcon) listIcon.className = 'fa-solid fa-play';
        }
    });

    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', () => {
            if (!audio.src) {
                const allTracks = document.querySelectorAll('.pro-track-item');
                if (allTracks.length > 0) allTracks[0].click();
                return;
            }
            if (audio.paused) audio.play().catch(() => {
                if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
            });
            else audio.pause();
        });
    }

    // Xử lý nút Next
    const nextBtn = document.querySelector('.controls-buttons .fa-forward-step');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const allTracks = document.querySelectorAll('.pro-track-item');
            if (allTracks.length === 0) return;
            
            if (currentPlayingItem) {
                const items = Array.from(allTracks);
                const currentIndex = items.indexOf(currentPlayingItem);
                if (currentIndex !== -1 && currentIndex < items.length - 1) {
                    items[currentIndex + 1].click();
                } else if (currentIndex === items.length - 1) {
                    items[0].click(); // Quay lại bài đầu tiên
                }
            } else {
                allTracks[0].click();
            }
        });
    }

    // Xử lý nút Previous
    const prevBtn = document.querySelector('.controls-buttons .fa-backward-step');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const allTracks = document.querySelectorAll('.pro-track-item');
            if (allTracks.length === 0) return;
            
            if (currentPlayingItem) {
                const items = Array.from(allTracks);
                const currentIndex = items.indexOf(currentPlayingItem);
                if (currentIndex > 0) {
                    items[currentIndex - 1].click();
                } else if (currentIndex === 0) {
                    items[items.length - 1].click(); // Quay lại bài cuối cùng
                }
            } else {
                allTracks[0].click();
            }
        });
    }

    function updateProgressOnDrag(e) {
        if (!audio.duration || !progressBar) return;
        const rect = progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (progressFill) progressFill.style.width = (percent * 100) + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(percent * audio.duration);
        audio.currentTime = percent * audio.duration;
    }

    if (progressBar) {
        progressBar.addEventListener('mousedown', () => {
            isDraggingProgress = true;
        });
    }

    function updateVolumeOnDrag(e) {
        if (!volumeBar) return;
        const rect = volumeBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.volume = percent;
        if (volumeFill) volumeFill.style.width = (percent * 100) + '%';
        lastVolume = (percent * 100) + '%';
        if (muteBtn) {
            muteBtn.className = percent === 0 ? 'fa-solid fa-volume-xmark' : 
                                  percent < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
        }
    }

    if (volumeBar) {
        volumeBar.addEventListener('mousedown', () => {
            isDraggingVolume = true;
        });
    }

    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) updateProgressOnDrag(e);
        if (isDraggingVolume) updateVolumeOnDrag(e);
    });

    document.addEventListener('mouseup', () => {
        isDraggingProgress = false;
        isDraggingVolume = false;
    });

    if (muteBtn && volumeFill) {
        muteBtn.addEventListener('click', function() {
            if (this.classList.contains('fa-volume-xmark')) {
                volumeFill.style.width = lastVolume === '0%' ? '50%' : lastVolume;
                audio.volume = parseFloat(volumeFill.style.width) / 100;
                this.className = audio.volume < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
            } else {
                volumeFill.style.width = '0%';
                audio.volume = 0;
                this.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    /* ========================================================
       5. ĐIỀU HƯỚNG ĐỘNG GIỮ AUDIO SỐNG QUYỀN HẠNG
    ======================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');

    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            fetch(href)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const newDoc = parser.parseFromString(html, 'text/html');
                    const newContent = newDoc.querySelector('.main-content');
                    
                    if (newContent && mainContent) {
                        mainContent.innerHTML = newContent.innerHTML;
                        
                        // Cập nhật nav item active
                        navItems.forEach(item => item.classList.remove('active'));
                        link.classList.add('active');
                        
                        // Rebind track items event listeners
                        const newTrackItems = document.querySelectorAll('.pro-track-item');
                        newTrackItems.forEach(item => {
                            item.addEventListener('click', function() {
                                currentPlayingItem = this;
                                newTrackItems.forEach(el => {
                                    el.classList.remove('active-playing');
                                    const icon = el.querySelector('.thumb-overlay i');
                                    if(icon) icon.className = 'fa-solid fa-play';
                                });
                                this.classList.add('active-playing');
                                const activeIcon = this.querySelector('.thumb-overlay i');
                                if(activeIcon) activeIcon.className = 'fa-solid fa-pause';
                                
                                const src = this.getAttribute('data-src') || this.getAttribute('src');
                                if (src) {
                                    audio.src = encodeURI(src.trim());
                                    audio.play().catch(() => {
                                        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
                                    });
                                    if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-pause';
                                    const title = this.getAttribute('data-title');
                                    const artist = this.getAttribute('data-artist');
                                    const thumb = this.getAttribute('data-thumb');
                                    const titleEl = document.querySelector('.playing-info h4');
                                    const artistEl = document.querySelector('.playing-info p');
                                    const thumbImg = document.querySelector('.now-playing img');
                                    if (title && titleEl) titleEl.textContent = title;
                                    if (artist && artistEl) artistEl.textContent = artist;
                                    if (thumb && thumbImg) thumbImg.src = thumb;
                                    // ensure sidebar playlist contains/highlights this track
                                    try { addOrHighlightSidebarEntry(this); } catch(e) { console.error(e); }
                                }
                            });
                        });

                        // Rebind next/previous buttons cho trang mới
                        const newNextBtn = document.querySelector('.controls-buttons .fa-forward-step');
                        if (newNextBtn) {
                            newNextBtn.onclick = () => {
                                const allTracks = document.querySelectorAll('.pro-track-item');
                                if (allTracks.length === 0) return;
                                
                                if (currentPlayingItem) {
                                    const items = Array.from(allTracks);
                                    const currentIndex = items.indexOf(currentPlayingItem);
                                    if (currentIndex !== -1 && currentIndex < items.length - 1) {
                                        items[currentIndex + 1].click();
                                    } else if (currentIndex === items.length - 1) {
                                        items[0].click();
                                    }
                                } else {
                                    allTracks[0].click();
                                }
                            };
                        }

                        const newPrevBtn = document.querySelector('.controls-buttons .fa-backward-step');
                        if (newPrevBtn) {
                            newPrevBtn.onclick = () => {
                                const allTracks = document.querySelectorAll('.pro-track-item');
                                if (allTracks.length === 0) return;
                                
                                if (currentPlayingItem) {
                                    const items = Array.from(allTracks);
                                    const currentIndex = items.indexOf(currentPlayingItem);
                                    if (currentIndex > 0) {
                                        items[currentIndex - 1].click();
                                    } else if (currentIndex === 0) {
                                        items[items.length - 1].click();
                                    }
                                } else {
                                    allTracks[0].click();
                                }
                            };
                        }
                    }
                })
                .catch(error => console.error('Lỗi tải trang:', error));
        });
    });
});
